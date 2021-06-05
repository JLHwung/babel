import type Parser from "../parser";
import { types as tt } from "../tokenizer/types";
import * as N from "../types";

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
          // A pipe-operator proposal is active,
          // although its configuration might not match `%` as a topic token.
          // If the pipe-operator plugin’s configuration matches the current token’s type,
          // then this will return `node`, will have been finished as a topic reference.
          // Otherwise, this will throw a `PipeTopicUnconfiguredToken` error.
          return this.finishTopicReference(
            node,
            start,
            pipeProposal,
            tt.modulo,
          );
        } else {
          // A pipe-operator proposal is not active.
          // Throw a fatal syntax error.
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
