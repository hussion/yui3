YUI.add("selection",function(B){var A="textContent",D="innerHTML",C="fontFamily";B.Selection=function(){var J,I,E,G,F,H;if(B.config.win.getSelection){J=B.config.win.getSelection();}else{if(B.config.doc.selection){J=B.config.doc.selection.createRange();}}this._selection=J;if(J.pasteHTML){A="nodeValue";this.isCollapsed=(J.compareEndPoints("StartToEnd",J))?false:true;if(this.isCollapsed){this.anchorNode=this.focusNode=B.one(J.parentElement());I=J.parentElement();G=I.childNodes;F=J.duplicate();for(H=0;H<G.length;H++){F.select(G[H]);if(F.inRange(J)){E=G[H];}}this.ieNode=E;if(E){if(E.nodeType!==3){if(E.firstChild){E=E.firstChild;}}this.anchorNode=this.focusNode=B.Selection.resolve(E);this.anchorOffset=this.focusOffset=(this.anchorNode.nodeValue)?this.anchorNode.nodeValue.length:0;this.anchorTextNode=this.focusTextNode=B.one(E);}}}else{this.isCollapsed=J.isCollapsed;this.anchorNode=B.Selection.resolve(J.anchorNode);this.focusNode=B.Selection.resolve(J.focusNode);this.anchorOffset=J.anchorOffset;this.focusOffset=J.focusOffset;this.anchorTextNode=B.one(J.anchorNode);this.focusTextNode=B.one(J.focusNode);}if(B.Lang.isString(J.text)){this.text=J.text;}else{this.text=J.toString();}};B.Selection.filter=function(){var F=B.all(B.Selection.ALL),G=B.all("strong,em"),E;F.each(function(I){if(I.getStyle(C)){var H=new B.StyleSheet("editor");H.set("."+I._yuid,{fontFamily:I.getStyle(C)});I.addClass(I._yuid);I.removeAttribute("face");I.setStyle(C,"");if(I.getAttribute("style")===""){I.removeAttribute("style");}if(I.getAttribute("style").toLowerCase()==="font-family: "){I.removeAttribute("style");}}});G.each(function(K,H){var I=K.get("tagName").toLowerCase(),J="i";if(I==="strong"){J="b";}B.Selection.prototype._swap(G.item(H),J);});E=B.all("ol,ul");E.each(function(I,H){var J=I.all("li");if(!J.size()){I.remove();}});B.Selection.filterBlocks();};B.Selection.filterBlocks=function(){var H=B.config.doc.body.childNodes,F,G,E=false,I=true;if(H){for(F=0;F<H.length;F++){G=B.one(H[F]);if(!G.test(B.Selection.BLOCKS)){I=true;if(H[F].nodeType==3){if(H[F].textContent=="\n"){I=false;}}if(I){if(!E){E=[];}E.push(H[F]);}}else{E=B.Selection._wrapBlock(E);}}E=B.Selection._wrapBlock(E);}};B.Selection._wrapBlock=function(F){if(F){var E=B.Node.create("<p></p>"),H=B.one(F[0]),G;for(G=1;G<F.length;G++){E.append(F[G]);}H.replace(E);E.prepend(H);}return false;};B.Selection.unfilter=function(){var F=B.all("body [class]"),G="",E,H;F.each(function(I){if(I.hasClass(I._yuid)){I.setStyle(C,I.getStyle(C));I.removeClass(I._yuid);if(I.getAttribute("class")===""){I.removeAttribute("class");}}});E=B.all(".yui-non");E.each(function(I){if(I.get("innerHTML")===""){I.remove();}else{I.removeClass("yui-non");}});H=B.all("body [id]");H.each(function(I){if(I.get("id").indexOf("yui_3_")===0){I.removeAttribute("id");I.removeAttribute("_yuid");}});G=B.one("body").get("innerHTML");F.each(function(I){I.addClass(I._yuid);I.setStyle(C,"");if(I.getAttribute("style")===""){I.removeAttribute("style");}});return G;};B.Selection.resolve=function(E){if(E&&E.nodeType===3){E=E.parentNode;}return B.one(E);};B.Selection.getText=function(E){return E.get("innerHTML").replace(B.Selection.STRIP_HTML,"");};B.Selection.ALL="[style],font[face]";B.Selection.STRIP_HTML=/<\S[^><]*>/g;B.Selection.BLOCKS="p,div,ul,ol,table,style";B.Selection.TMP="yui-tmp";B.Selection.DEFAULT_TAG="span";B.Selection.CURID="yui-cursor";B.Selection.CURSOR='<span id="'+B.Selection.CURID+'">&nbsp;</span>';B.Selection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.set(D,"");G.append(F);return B.Node.getDOMNode(F);},_swap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.replace(F,G);return B.Node.getDOMNode(F);},getSelected:function(){B.Selection.filter();B.config.doc.execCommand("fontname",null,B.Selection.TMP);var F=B.all(B.Selection.ALL),E=[];F.each(function(H,G){if(H.getStyle(C,B.Selection.TMP)){H.setStyle(C,"");H.removeAttribute("face");if(H.getAttribute("style")===""){H.removeAttribute("style");}E.push(B.Node.getDOMNode(F.item(G)));}});return B.all(E);},insertContent:function(E){return this.insertAtCursor(E,this.anchorTextNode,this.anchorOffset,true);},insertAtCursor:function(K,F,H,M){var O=B.Node.create("<"+B.Selection.DEFAULT_TAG+' class="yui-non"></'+B.Selection.DEFAULT_TAG+">"),E,I,G,N,J=this.createRange(),L;if(F.test("body")){console.log("Node: ",F);L=B.Node.create("<span></span>");F.append(L);F=L;}if(J.pasteHTML){N=B.Node.create(K);J.pasteHTML('<span id="rte-insert"></span>');E=B.one("#rte-insert");E.set("id","");E.replace(N);return N;}else{E=F.get(A);I=B.one(B.config.doc.createTextNode(E.substr(0,H)));G=B.one(B.config.doc.createTextNode(E.substr(H)));F.replace(I,F);N=B.Node.create(K);I.insert(N,"after");if(G&&G.get("length")){N.insert(O,"after");O.insert(G,"after");this.selectNode(O,M);}}return N;},wrapContent:function(F){F=(F)?F:B.Selection.DEFAULT_TAG;if(!this.isCollapsed){var H=this.getSelected(),K=[],G,I,J,E;H.each(function(N,L){var M=N.get("tagName").toLowerCase();if(M==="font"){K.push(this._swap(H.item(L),F));}else{K.push(this._wrap(H.item(L),F));}},this);G=this.createRange();J=K[0];I=K[K.length-1];if(this._selection.removeAllRanges){G.setStart(K[0],0);G.setEnd(I,I.childNodes.length);this._selection.removeAllRanges();this._selection.addRange(G);}else{G.moveToElementText(B.Node.getDOMNode(J));E=this.createRange();E.moveToElementText(B.Node.getDOMNode(I));G.setEndPoint("EndToEnd",E);G.select();}K=B.all(K);return K;}else{return B.all([]);}},replace:function(K,I){var F=this.createRange(),J,E,G,H;if(F.getBookmark){G=F.getBookmark();E=this.anchorNode.get("innerHTML").replace(K,I);this.anchorNode.set("innerHTML",E);F.moveToBookmark(G);H=B.one(F.parentElement());}else{J=this.anchorTextNode;E=J.get(A);G=E.indexOf(K);E=E.replace(K,"");J.set(A,E);H=this.insertAtCursor(I,J,G,true);}return H;},remove:function(){this._selection.removeAllRanges();
return this;},createRange:function(){if(B.config.doc.selection){return B.config.doc.selection.createRange();}else{return B.config.doc.createRange();}},selectNode:function(G,I,E){E=E||0;G=B.Node.getDOMNode(G);var F=this.createRange();if(F.selectNode){F.selectNode(G);this._selection.removeAllRanges();this._selection.addRange(F);if(I){try{this._selection.collapse(G,E);}catch(H){this._selection.collapse(G,0);}}}else{F.moveToElementText(G);F.select();if(I){F.collapse(((E)?false:true));}}return this;},setCursor:function(){return this.insertContent(B.Selection.CURSOR);},getCursor:function(){return B.one("#"+B.Selection.CURID);},focusCursor:function(){var E=this.getCursor();if(E){E.set("id","");E.set("innerHTML"," ");this.selectNode(E);}},toString:function(){return"Selection Object";}};},"@VERSION@",{requires:["node"],skinnable:false});