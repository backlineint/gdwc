---
to: <%= elementName %>.js
---
<%
  className = 'Gdwc' + h.changeCase.pascal(elementName);
  gdwcElementName = 'gdwc-' + elementName;
%>
import { <%= className %> } from './<%= gdwcElementName %>/<%= gdwcElementName %>.js';

if (!customElements.get('<%= gdwcElementName %>')) {
  customElements.define('<%= gdwcElementName %>', <%= className %>);
}