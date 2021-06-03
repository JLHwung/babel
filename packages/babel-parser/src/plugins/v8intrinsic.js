import type Parser from "../parser";
import { types as tt } from "../tokenizer/types";
import * as N from "../types";
import { Errors } from "../parser/error";

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    parseV8Intrinsic(): N.Expression {
      if (this.match(tt.modulo)) {
        const start = this.state.start;
        // let the `loc` of Identifier starts from `%`
        const node = this.startNode();
        this.eat(tt.modulo);
        if (this.match(tt.name)) {
          const name = this.parseIdentifierName(this.state.start);
          const identifier = this.createIdentifier(node, name);
          identifier.type = "V8IntrinsicIdentifier";
          if (this.match(tt.parenL)) {
            return identifier;
          }
        }

        // In this case, the `%` currently being parsed is not followed by an identifier,
        // so it therefore cannot be a V8 intrinsic.
        // If the `pipelineOperator` plugin is active,
        // then the `%` currently being parsed may instead be a topic reference.
        const pipeProposal = this.getPluginOption(
          "pipelineOperator",
          "proposal",
        );

        if (pipeProposal) {
          // A pipe-operator proposal is active.
          const moduloTopicTokenIsActive = this.testTopicReferenceConfiguration(
            pipeProposal,
            tt.modulo,
          );

          if (moduloTopicTokenIsActive) {
            // The token matches the plugin’s configuration.
            // The token is therefore a topic reference.
            return this.finishTopicReferenceNode(node, start, pipeProposal);
          } else {
            // The token does not match the plugin’s configuration.
            throw this.raise(
              start,
              Errors.PipeTopicUnconfiguredToken,
              tt.modulo.label,
            );
          }
        } else {
          // A pipe-operator proposal is not active.
          this.unexpected(start);
        }
      }
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    parseExprAtom(): N.Expression {
      return this.parseV8Intrinsic() || super.parseExprAtom(...arguments);
    }
  };
