!function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),d={CONTAINER:{TOP:30,BOTTOM:50},NODE:{LEFT:10},NODE_NAME:{LEFT:20}},r={UPDATE_NAME:"updateName",TOGGLE_CHILDREN:"toggleChildren",DELETE_NODE:"deleteNode",APPEND_NODE_TEMP:"appendNodeTemp",MOVE_NODE:"moveNode"},o={8:"DELETE",9:"TAB",13:"ENTER",37:"LEFT",38:"TOP",40:"BOTTOM",39:"RIGHT"},s={BOTTOM:"appendToBottom",RIGHT:"appendToRight"},l={TOP:"moveTop",LEFT:"moveLeft",BOTTOM:"moveBottom",RIGHT:"moveRight"},h=function(){function t(e){i(this,t);var n=e.json,a=e.svg,d=e.wrapper,r=e.addToBottom,o=e.addToRight,s=e.nodeWidth,l=e.nodeHeight,h=e.nodeMargin;this.json=n,this.$svgWrap=d3.select(d),this.$svg=d3.select(a),this.$addNodeBottom=d3.select(r),this.$addNodeRight=d3.select(o),this.columnWidth=s||200,this.textLineWidth=this.columnWidth-50,this.textMinLength=10,this.nodeHeight=l||30,this.rowHeight=this.nodeHeight+(h||0),this.init()}return a(t,[{key:"init",value:function(){var t=this;this.getJsonData(function(e){t.bindEvents(),t.initNodeData(e),t.updateUserInputNode(),t.updateNodesLayout(),t.initLayout(),t.initNode()})}},{key:"getJsonData",value:function(t){d3.json(this.json,function(e,n){if(e)throw e;t(n)})}},{key:"bindEvents",value:function(){var t=this;document.addEventListener("keydown",function(e){t.onKeydownView(e)}),this.$addNodeBottom.on("click",function(e){t.onClickAddNode(s.BOTTOM)}),this.$addNodeRight.on("click",function(e){t.onClickAddNode(s.RIGHT)})}},{key:"onKeydownView",value:function(t){var e=o[t.which],n=e?l[e]:null;if("DELETE"===e)this.deleteSelectedNode();else if("ENTER"===e||"TAB"===e){t.preventDefault();var i=this.getSelectedNodes(),a="TAB"===e?s.RIGHT:s.BOTTOM;if(null===i||0===i.length)return;var d=i[0];this.appendTempNode(d,a)}else if(n){var r=this.nodeList.filter(function(t){return t._isEdit}).length>0;r||(this.moveSelectNode(l[e]),t.preventDefault())}}},{key:"onClickAddNode",value:function(t){var e=this.getSelectedNodes();if(null!==e&&0!==e.length){var n=e[0];this.appendTempNode(n,t)}}},{key:"createNodeData",value:function(t){return d3.hierarchy(t,function(t){return t.children})}},{key:"initNodeData",value:function(t){this.nodes=this.createNodeData(t),this.nodeList=this.nodes.descendants(),this.nodeList=this.nodeList.map(function(t){return t._isShow=!0,t._isEdit=!1,t._isDragging=!1,t})}},{key:"updateNodesLayout",value:function(){var t=this,e=null===this.$svg.attr("width");this.setChildProperties(this.nodes,0,!0),this.nodes.leaves().map(function(e){t.setLeafLength(e)}),this.nodeList.map(function(e){t.setNodeNameProperties(e),t.setVerticalIndex(e)}),this.nodeList.map(function(e){e._x=e.depth*t.columnWidth,e._y=e._verticalIndex*t.rowHeight}),this.columnCount=d3.max(this.nodeList,function(t){return t.depth})+1,this.rowCount=d3.max(this.nodeList,function(t){return t._verticalIndex})+1,this.svgWidth=this.columnCount*this.columnWidth,this.svgHeight=this.rowCount*this.rowHeight+d.CONTAINER.BOTTOM,e?this.$svg.attr("width",this.svgWidth).attr("height",this.svgHeight):this.$svg.transition().duration(500).attr("width",this.svgWidth).attr("height",this.svgHeight),this.updateBackground()}},{key:"calculateNodePathD",value:function(t){if(t&&t.parent){var e=d.NODE.LEFT,n=t._y,i=t.parent._y,a=n-i;return 0===a?"M0,0 h10":"M0,"+-a+" q"+e/2+",0,"+e/2+",5 v"+(a-10)+" q0,"+e/2+","+e/2+","+e/2}}},{key:"setChildProperties",value:function(t,e,n){var i=this.getChildren(t);if(t._childIndex=e,t._isShow=n,t._isTemp=!!t.data._isTemp,i&&i.length>0){t._childrenLength=i.length,!1===t._isToggleOpen&&(n=!1);for(var a=0,d=i.length;a<d;a++)this.setChildProperties(i[a],a,n)}else t._childrenLength=0}},{key:"setLeafLength",value:function(t){if(this.hasChildren(t)){var e=t.children.filter(function(t){return t._isShow}),n=e.length;e.map(function(t){t._leafLength>0&&(n+=t._leafLength-1)}),t._leafLength=n}else t._leafLength=0;null!==t.parent&&this.setLeafLength(t.parent)}},{key:"setNodeNameProperties",value:function(t){var e=(new u).measureTextSize(t.data.name,this.$svg);t._nameWidth=e.width,t._nameHeight=e.height;var n=this.splitStringEachLine(t.data.name);t._ellipsisName=n[0],t._isEllpsis=n.length>1,t._isEllpsis&&(t._ellipsisName+="...")}},{key:"setVerticalIndex",value:function(t){var e=0;void 0===t.parent||null===t.parent?e=0:0!==t._childIndex&&t._isShow?null!==t.parent.children&&t.parent.children.map(function(n){n._childIndex===t._childIndex-1&&(e=n._verticalIndex+Math.max(n._leafLength-1,0)+1)}):e=t.parent._verticalIndex,t._verticalIndex=e}},{key:"updateBackground",value:function(){var t=this;void 0===this.$background&&(this.$background=this.$svg.append("g").attr("class","tree-bg").on("click",function(){t.blurNode()}));var e=this.$background.selectAll("rect"),n=e.data().length,i=Math.ceil(this.svgWidth/this.columnWidth);if(n<i)for(var a=n;a<i;a++)this.$background.append("rect").attr("data-index",a).attr("width",this.columnWidth).attr("height",this.svgHeight).attr("x",a*this.columnWidth).attr("y",0);else n>i&&e.each(function(t){var e=d3.select(this);e.attr("data-index")>=i&&e.remove()});e.transition().duration(500).attr("width",this.columnWidth).attr("height",this.svgHeight)}},{key:"initLayout",value:function(){this.$nodeWrap=this.$svg.append("g").attr("transform","translate(0, "+d.CONTAINER.TOP+")")}},{key:"showTooltip",value:function(t,e){if(e._isEllpsis){var n={left:10,top:5},i=this.$svgWrap.append("div").attr("class","node-tooltip"),a=(i.append("p").attr("class","node-tooltip-text").text(e.data.name),i.node().clientHeight),r=e._y+d.CONTAINER.TOP-this.rowHeight/2-a-n.top;i.attr("style","left:"+(e._x+n.left)+"px; top:"+r+"px;")}}},{key:"hideTooltip",value:function(){this.$svgWrap.selectAll(".node-tooltip").remove()}},{key:"updateUserInputNode",value:function(t){var e=this,n=this,i=void 0,a=void 0;this.nodes.each(function(t){if(i=t.data.maximum_leaf_count||-1,a=t.data.minimum_leaf_count||-1,i<0||a<0)return!0;var d=n.createNodeData({id:e.createNodeId(),name:"回答者が入力",children:null});d._isUserInput=!0,e.insertChild(t,d,0)}),this.nodeList=this.nodes.descendants()}},{key:"startDragging",value:function(t){this.$dragNode=d3.select(t);var e=this.$dragNode.data()[0];this.setPropertyForNode(e,"_isDragging",!0),this.focusNode(e)}},{key:"doDragging",value:function(){var t=this.$dragNode.data()[0];0===t.depth||t._isUserInput||(this.$svgWrap.classed("is-dragging")||this.appendDragLayer(),this.$dummyNode?this.$dummyNode.attr("transform","translate("+d3.event.x+", "+d3.event.y+")"):this.createDummyNode())}},{key:"createDummyNode",value:function(){this.$dummyNode=(new u).copySelection(this.$dragNode,this.$nodeWrap).attr("class","node--drag").attr("opacity","0.5").attr("pointer-events","none"),this.$dummyNode.attr("data-init-transform",this.$dummyNode.attr("transform"))}},{key:"appendDragLayer",value:function(){var t=this,e=this.$dragNode.data()[0],n=function(t){d3.select(this).classed("is-selected",!0)},i=function(t){d3.select(this).classed("is-selected",!1)},a=function(a){a.attr("class","tree-dragarea").classed("is-disabled",function(t){var n=d3.select(this),i=parseInt(n.attr("data-childindex"));return t.parent===e.parent&&e._childIndex===i-1||t._isDragging||t._isUserInput}).attr("width",t.columnWidth).attr("data-depth",function(t){return t.depth}).attr("data-parentid",function(t){return t.parent?t.parent.data.id:-1}).on("mouseover",n).on("mouseout",i)},d=function(e,n){e.append("rect").attr("width",t.columnWidth).attr("height",function(t){return r(t,n)}),e.append("line").attr("x1",0).attr("y1",function(t){return o(t,n)}).attr("x2",e.attr("width")).attr("y2",function(t){return o(t,n)})},r=function(e,n){var i=0,a=0===e._childIndex;e._verticalIndex;if(a)i=t.rowHeight/2;else if(n)i=t.svgHeight-e._y-t.rowHeight/2;else{var d=t.getChildren(e.parent)[e._childIndex-1];i=e._y-d._y}return i},o=function(e,n){var i=0===e._childIndex;return i&&n?t.rowHeight/2:i?0:n?t.rowHeight/2:r(e,n)-t.rowHeight/2};this.$nodeWrap.selectAll(".node").append("g").classed("is-first",function(t){return 0===t._childIndex}).attr("transform",function(t){return"translate(0, "+-r(t)+")"}).attr("data-childindex",function(t){return t._childIndex}).call(a).call(function(t){d(t,!1)}),this.$nodeWrap.selectAll(".node--youngest").append("g").classed("is-last",!0).attr("transform","translate(0,0)").attr("data-childindex",function(t){return t._childIndex+1}).call(a).call(function(t){d(t,!0)});this.$nodeWrap.selectAll(".tree-dragarea"),this.$svgWrap.classed("is-dragging",!0)}},{key:"endDragging",value:function(){var t=this,e=d3.select(".tree-dragarea.is-selected"),n=function(){if(t.$dragNode){var e=t.$dragNode.data()[0];t.$nodeWrap.selectAll(".tree-dragarea").remove(),t.$svgWrap.classed("is-dragging",!1),t.setPropertyForNode(e,"_isDragging",!1),t.$dummyNode=null,t.$svg.selectAll(".node--drag").remove(),t.$dragNode=null}};if(void 0===this.$dummyNode||null===this.$dummyNode)return void n();if(e.data().length>0){var i=this.$dragNode.data()[0],a=parseInt(e.attr("data-parentid")),d=parseInt(e.attr("data-childindex")),o=parseInt(e.attr("data-depth"));if(this.isMovedNode(i,a,d,o))return this.updateNode({type:r.MOVE_NODE,data:{moveNode:this.$dragNode.data()[0],toParentId:a,toChildIndex:d,toDepth:o}}),void n()}this.$dummyNode.transition().duration(500).attr("transform",this.$dummyNode.attr("data-init-transform")).on("end",function(){n()})}},{key:"getLineBreakTexts",value:function(t){var e="";return this.splitStringEachLine(t.data.name).forEach(function(t,n){e+='<tspan class="line line'+n+'" x="0" y="'+1.5*n+'em" dx="0.6em" dy="0.35em">'+t+"</tspan>"}),e}},{key:"splitStringEachLine",value:function(t){for(var e=[],n=0,i=0,a=t.length;i<a;i++){var d=t[i];e.length<=n&&e.push(""),e[n]+=d;if(e[n].length>this.textMinLength){(new u).measureTextSize(e[n],this.$svg).width>=this.textLineWidth&&++n}}return e}},{key:"initNode",value:function(){this.$nodes=this.createNode(this.nodeList),this.updateParentNode()}},{key:"updateParentNode",value:function(){this.updateLineToChild(),this.updateToggleChildren()}},{key:"hasChildren",value:function(t){var e=this.getChildren(t);return e&&e.length>0}},{key:"getChildren",value:function(t){return t.children}},{key:"insertChild",value:function(t,e,n){if(this.hasChildren(t)){var i=this.getChildren(t);void 0===n||i.length<=n?(i.push(e),t.data.children.push(e.data)):(i.splice(n,0,e),t.data.children.splice(n,0,e.data))}else t.children=[e],t.data.children=[e];e.parent=t,this.setPropertyForNode(e,"depth",t.depth+1,function(t){return t+1})}},{key:"setPropertyForNode",value:function(t,e,n,i){if(t[e]=n,this.hasChildren(t)){var a=this.getChildren(t);"function"==typeof i&&(n=i(n));for(var d=0,r=a.length;d<r;d++)this.setPropertyForNode(a[d],e,n,i)}}},{key:"setCommonPropetiesForNode",value:function(t){var e=this;t.classed("node--oldest",function(t){return 0===t._childIndex}).classed("node--youngest",function(t){return t.parent&&t._childIndex===e.getChildren(t.parent).length-1}).classed("node--branch",function(t){var n=[];return e.hasChildren(t)&&(n=e.getChildren(t)),n.length>0}).classed("node--leaf",function(t){return!e.hasChildren(t)}).classed("node--other",function(t){var n=e.getChildren(t),i=!1;return e.hasChildren(t)&&e.getChildren(t).map(function(t){if(!e.hasChildren(t))return i=!0,!1}),n&&!i}).classed("node--userinput",function(t){return t._isUserInput}).classed("is-close",!1)}},{key:"createNodeId",value:function(){var t=d3.max(this.nodes.descendants(),function(t){return t.data.id});return++t}},{key:"createNode",value:function(t){var e=this,n=this,i=this.$nodeWrap.selectAll(".node").data(t,function(t){return t.data.id}).enter().append("g").attr("class",function(t){return"node"}).call(this.setCommonPropetiesForNode.bind(this)).attr("width",this.columnWidth).attr("height",this.nodeHeight).attr("opacity",1).attr("transform",function(t){return"translate("+t._x+", "+t._y+")"}),a=i.append("rect");i.append("text").attr("class","node-name").attr("x",d.NODE_NAME.LEFT).attr("y","0.35em").text(function(t){return t._ellipsisName?t._ellipsisName:t.data.name}),i.append("path").attr("class","node-path").attr("d",this.calculateNodePathD).attr("fill","none");return a.attr("height",function(t){return t._nameHeight}).attr("class","node-bg").attr("width",this.columnWidth-d.NODE.LEFT).attr("height",this.nodeHeight).attr("x",d.NODE.LEFT).attr("y",-this.nodeHeight/2).attr("fill","transparent").on("mouseover",function(t){n.$svgWrap.classed("is-dragging")||n.showTooltip(d3.select(this),t)}).on("mouseout",function(t){e.hideTooltip()}).on("click",function(t){n.focusNode(t)}).on("dblclick",function(t){n.editStartNodeName(t)}),i.each(function(t){t._isUserInput?d3.select(this).append("text").attr("class","node--userinput-range").attr("x",n.columnWidth-10).attr("y","0.35em").attr("text-anchor","end").text(function(t){var e=t.parent.data.maximum_leaf_count;return t.parent.data.minimum_leaf_count+"〜"+e}):d3.select(this).call(d3.drag().on("start",function(){n.startDragging(this)}).on("drag",function(){n.doDragging()}).on("end",function(){n.endDragging()}))}),i}},{key:"updateNode",value:function(t){var e=this;if(t)switch(t.type){case r.UPDATE_NAME:this.nodeList.map(function(n){if(t.data.id!==n.data.id)return!0;for(var i in t.data)n.data[i]=t.data[i];e.setNodeNameProperties(n)});break;case r.TOGGLE_CHILDREN:var n=t.data.node;void 0===n._isToggleOpen?n._isToggleOpen=!1:n._isToggleOpen=!n._isToggleOpen,this.updateNodesLayout();break;case r.DELETE_NODE:if(0===t.data.deleteNode.depth)return;this.deleteNodeData(t.data.deleteNode,t.confirm),this.nodeList=this.nodes.descendants(),this.updateNodesLayout();break;case r.APPEND_NODE_TEMP:this.nodeList=this.nodes.descendants(),this.updateNodesLayout();break;case r.MOVE_NODE:var i=t.data,a=i.moveNode,d=i.toParentId,o=i.toChildIndex,s=i.toDepth,l=a.parent&&a.parent.data.id===d,h=a._childIndex<o;if(l&&h&&--o,!this.isMovedNode(a,d,o,s))return;this.deleteNodeData(a),this.nodes.each(function(t){return t.data.id!==d||(e.insertChild(t,a,o),!1)}),this.nodeList=this.nodes.descendants(),this.updateNodesLayout()}var u=this.createNode(this.nodeList);this.$nodes=this.$nodeWrap.selectAll(".node").data(this.nodeList,function(t){return t.data.id}).call(this.setCommonPropetiesForNode.bind(this)).transition().on("end",function(t){t._isShow||d3.select(this).classed("is-close",!0)}).duration(500).attr("opacity",function(t){return t._isShow?1:0}).attr("transform",function(t){return"translate("+t._x+", "+t._y+")"});this.$nodeWrap.selectAll(".node").data(this.nodeList,function(t){return t.data.id}).exit().remove(),this.$nodes.selectAll(".node-name").text(function(t){return t._ellipsisName?t._ellipsisName:t.data.name});if(this.$nodeWrap.selectAll(".node-path").transition().duration(500).attr("d",this.calculateNodePathD),void 0!==u&&null!==u&&u.data().length>0){var c=u.data()[0];this.editStartNodeName(c),this.focusNode(c)}this.updateParentNode()}},{key:"focusNode",value:function(t){var e=[];Array.isArray(t)?t.map(function(t){e.push(t.data.id)}):e.push(t.data.id),this.$nodes.each(function(t){var n=d3.select(this),i=e.indexOf(t.data.id)>-1;n.classed("is-selected",i)})}},{key:"blurNode",value:function(){this.$nodes.each(function(t){d3.select(this).classed("is-selected",!1)})}},{key:"moveSelectNode",value:function(t){var e=this.getSelectedNodes();if(null!==e&&0!==e.length){var n=e[0],i=(n._childIndex,n.depth),a=void 0,d=void 0;switch(t){case l.TOP:d=this.nodeList.filter(function(t){return n.depth===t.depth&&n._verticalIndex>t._verticalIndex}),a=d.length>0?d[d.length-1]:void 0;break;case l.LEFT:a=n.parent?[n.parent]:void 0;break;case l.BOTTOM:d=this.nodeList.filter(function(t){return n.depth===t.depth&&n._verticalIndex<t._verticalIndex}),a=d.length>0?d[0]:void 0;break;case l.RIGHT:a=this.nodeList.filter(function(t){return n===t.parent&&0===t._childIndex&&t.depth===i+1})}void 0!==a&&0!==a.length&&this.focusNode(a)}}},{key:"getSelectedNodes",value:function(){var t=this.$nodeWrap.select(".node.is-selected").data();return void 0===t&&0===selectedData.length?null:t}},{key:"deleteSelectedNode",value:function(){for(var t=this.getSelectedNodes(),e=0,n=t.length;e<n;e++)this.deleteNode(t[e])}},{key:"deleteNode",value:function(t){var e=this;t._isEdit||this.updateNode({type:r.DELETE_NODE,data:{deleteNode:t},confirm:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){var n=e.getChildren(t)&&e.getChildren(t).length>0,i=!0;return n&&(i=confirm("子階層のノードも削除されますが、本当に削除してもよろしいですか？")),i})})}},{key:"deleteNodeData",value:function(t,e){var n=null,i=null;this.nodes.each(function(e){if(t===e)return n=e,i=e.parent,!1}),e&&"function"==typeof e&&!e(n)||i.children.map(function(t,e){if(t!==n)return!0;i.children.splice(e,1)})}},{key:"editStartNodeName",value:function(t){var e=this,n=void 0;if(!t._isUserInput){this.$nodes.each(function(e){if(e.data.id===t.data.id)return n=d3.select(this),!1}),t._isEdit=!0,n.classed("is-editing",!0);this.$svgWrap.append("input").attr("type","text").attr("value",t.data.name).attr("class","node-textbox").attr("style","left:"+(t._x+d.NODE.LEFT)+"px; top:"+(t._y+d.CONTAINER.TOP-this.nodeHeight/2)+"px; width:"+(this.columnWidth-d.NODE.LEFT)+"px; height:"+this.nodeHeight+"px;").on("blur",function(){var i=""===this.value.trim(),a=d3.select(this).node().value;if(t._isEdit=!1,n.classed("is-editing",!1),e.$svgWrap.selectAll(".node-textbox").remove(),i){if(t._isTemp)return void e.deleteNode(t);a=t.data.name}e.updateNode({type:r.UPDATE_NAME,data:{id:t.data.id,name:a}})}).node().focus()}}},{key:"editEndNodeName",value:function(){var t=this.$svgWrap.selectAll(".node-textbox");0!==t.data().length&&(t.node().blur(),this.updateLineToChild())}},{key:"isMovedNode",value:function(t,e,n,i){var a=t.parent&&t.parent.data.id===e,d=t._childIndex===n,r=t.depth===i;return!(a&&d&&r)}},{key:"isNodeNameEmpty",value:function(){var t=!0,e=this.$svgWrap.selectAll(".node-textbox");return 0===e.data().length?t:t=""===e.node().value.trim()}},{key:"appendTempNode",value:function(t,e){if(t._isEdit)return void(this.isNodeNameEmpty()||this.editEndNodeName());if(!t._isUserInput||e!==s.RIGHT){var n=t.parent;if(null!==n||e!==s.BOTTOM){var i=this.createNodeData({id:this.createNodeId(),name:"",children:null,_isTemp:!0});switch(e){case s.RIGHT:this.insertChild(t,i);break;case s.BOTTOM:this.insertChild(n,i,t._childIndex+1)}this.updateNode({type:r.APPEND_NODE_TEMP})}}}},{key:"updateToggleChildren",value:function(){var t=this;this.$nodes.each(function(e){var n=d3.select(this),i=t.hasChildren(e),a=null!==n.select(".node-toggle").node();if(i&&!a){var d=n.append("g").attr("class","node-toggle").attr("transform","translate("+(t.columnWidth-16)+", 0)").on("click",function(e){t.toggleChildren(e)});d.append("circle").attr("r",8),d.append("text").attr("class","node-toggle-label").attr("width",16).attr("hegith",16).attr("text-anchor","middle").attr("dy",4).text(!1===e._isToggleOpen?"+":"–")}else i&&a?n.select(".node-toggle-label").text(!1===e._isToggleOpen?"+":"–"):!i&&a&&n.select(".node-toggle").remove()})}},{key:"updateLineToChild",value:function(){var t=this;this.$svgWrap.selectAll(".node-branch-line").remove(),this.$svgWrap.selectAll(".node--other").each(function(e){var n=d3.select(this);t.hasChildren(e),n.select(".node-branch-line").node()})}},{key:"toggleChildren",value:function(t){this.updateNode({type:r.TOGGLE_CHILDREN,data:{node:t}})}}]),t}(),u=function(){function t(){i(this,t)}return a(t,[{key:"measureTextSize",value:function(t,e){var n=e.append("text").attr("class","temp-measure-text").html(t),i=n.node().getBBox();return n.remove(),i}},{key:"copySelection",value:function(t,e){var n=t.node(),i=n.nodeName,a=n.attributes,d=(n.children,e.append(i));return Object.keys(a).forEach(function(t){d.attr(a[t].name,a[t].value)}),d.html(t.html()),d}}]),t}();!function(){window.TreeUI=h}()}]);
//# sourceMappingURL=bundle.js.map