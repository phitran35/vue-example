/* eslint-disable */
"use strict";
import * as tslib_1 from "tslib";
import Vue from "vue";
import Component from "vue-class-component";
import * as common from "./common";
export * from "./common";
import { vueNodeTemplateHtml, vueTreeTemplateHtml } from "./vue-variables";
var Node = /** @class */ (function (_super) {
    tslib_1.__extends(Node, _super);
    function Node() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contextmenuVisible = false;
        _this.contextmenuStyle = {
            "position": "absolute",
            "left": "0px",
            "top": "0px",
            "z-index": typeof _this.zindex === "number" ? _this.zindex : 1,
        };
        _this.hovered = false;
        _this.doubleClick = new common.DoubleClick();
        return _this;
    }
    Object.defineProperty(Node.prototype, "nodeClassName", {
        get: function () {
            return common.getNodeClassName(this.data, this.last);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "anchorClassName", {
        get: function () {
            if (this.data.customClass) {
                return common.getAnchorClassName(this.data, this.hovered) + ' ' + common.getCustomClassName(this.data.customClass);
            }
            return common.getAnchorClassName(this.data, this.hovered);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "checkboxClassName", {
        get: function () {
            return common.getCheckboxClassName(this.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "iconClassName", {
        get: function () {
            return common.getIconClassName(this.data.icon);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "customClassName", {
        get: function () {
            return common.getCustomClassName(this.data.customClass);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "pathString", {
        get: function () {
            return this.path.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "hasMarker", {
        get: function () {
            return this.draggable && this.data.state.dropPosition !== 0 /* empty */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "markerClassName", {
        get: function () {
            return common.getMarkerClassName(this.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "eventData", {
        get: function () {
            return {
                data: this.data,
                path: this.path,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "contextmenuData", {
        get: function () {
            return {
                data: this.data,
                path: this.path,
                root: this.root,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "id", {
        get: function () {
            return common.getId(this.path, this.preid);
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.geChildPath = function (index) {
        return this.path.concat(index);
    };
    Node.prototype.hover = function (hovered) {
        this.hovered = hovered;
        if (!hovered) {
            this.contextmenuVisible = false;
        }
    };
    Node.prototype.ontoggle = function (eventData) {
        if (eventData) {
            this.$emit("toggle", eventData);
        }
        else {
            if (this.data.state.openable || this.data.children.length > 0) {
                this.$emit("toggle", this.eventData);
            }
        }
    };
    Node.prototype.onchange = function (eventData) {
        var _this = this;
        if (eventData) {
            this.$emit("change", eventData);
        }
        else {
            if (this.data.state.disabled) {
                return;
            }
            this.doubleClick.onclick(function () {
                _this.$emit("change", _this.eventData);
            });
        }
    };
    Node.prototype.onViewEmployer = function (eventData) {
        console.log('tree-lib onViewEmployer callback=', eventData);
        if (eventData && this.data.callback) {
            this.data.callback(eventData);
        }
        else {
            if (this.data.state.disabled) {
                return;
            }
        }
    };
    Node.prototype.onViewQuestions = function (eventData) {
        console.log('tree-lib onViewQuestions callback=', eventData);
        if (eventData && this.data.callback) {
            this.data.callback(eventData);
        }
        else {
            if (this.data.state.disabled) {
                return;
            }
        }
    };
    Node.prototype.onViewQuestion = function (eventData) {
        console.log('tree-lib onViewQuestion callback=', eventData);
        if (eventData && this.data.callback) {
            this.data.callback(eventData);
        }
        else {
            if (this.data.state.disabled) {
                return;
            }
        }
    };
    Node.prototype.onSendApproval = function (eventData) {
        console.log('tree-lib onSendApproval callback=', eventData);
        if (eventData && this.data.callback) {
            this.data.callback(eventData);
        }
        else {
            if (this.data.state.disabled) {
                return;
            }
        }
    };
    Node.prototype.oncontextmenu = function (e) {
        this.contextmenuVisible = true;
        this.contextmenuStyle.left = e.offsetX + "px";
        this.contextmenuStyle.top = e.offsetY + "px";
        e.preventDefault();
        return false;
    };
    Node = tslib_1.__decorate([
        Component({
            template: vueNodeTemplateHtml,
            props: ["data", "last", "checkbox", "path", "draggable", "root", "zindex", "preid"],
        })
    ], Node);
    return Node;
}(Vue));
Vue.component("node", Node);
var Tree = /** @class */ (function (_super) {
    tslib_1.__extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragTarget = null;
        _this.dropTarget = null;
        return _this;
    }
    Object.defineProperty(Tree.prototype, "rootClassName", {
        get: function () {
            return common.getRootClassName(this.checkbox, this.size, this.theme);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "containerClassName", {
        get: function () {
            return common.getContainerClassName(this.nodots);
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.ontoggle = function (eventData) {
        this.$emit("toggle", eventData);
    };
    Tree.prototype.onchange = function (eventData) {
        this.$emit("change", eventData);
    };
    Tree.prototype.onViewEmployer = function (eventData) {
        this.$emit("viewEmployer", eventData);
    };
    Tree.prototype.ondragstart = function (event) {
        if (!this.draggable) {
            return;
        }
        this.dragTarget = event.target;
        this.dropTarget = event.target;
    };
    Tree.prototype.ondragend = function (event) {
        if (!this.draggable) {
            return;
        }
        this.dragTarget = null;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var tree = _a[_i];
            common.clearMarkerOfTree(tree);
        }
    };
    Tree.prototype.ondragover = function (event) {
        if (!this.canDrop(event)) {
            return;
        }
        common.ondrag(event.pageY, this.dragTarget, this.dropTarget, this.data, this.dropAllowed);
        event.preventDefault();
    };
    Tree.prototype.ondragenter = function (event) {
        if (!this.canDrop(event)) {
            return;
        }
        this.dropTarget = event.target;
        common.ondrag(event.pageY, this.dragTarget, this.dropTarget, this.data, this.dropAllowed);
    };
    Tree.prototype.ondragleave = function (event) {
        if (!this.canDrop(event)) {
            return;
        }
        if (event.target === this.dropTarget) {
            this.dropTarget = null;
        }
        common.ondragleave(event.target, this.data);
    };
    Tree.prototype.ondrop = function (event) {
        var _this = this;
        if (!this.canDrop(event)) {
            return;
        }
        common.ondrop(event.target, this.dragTarget, this.data, function (dropData) {
            _this.$emit("drop", dropData);
        });
    };
    Tree.prototype.canDrop = function (event) {
        return this.draggable && event.target && event.target.dataset && event.target.dataset.path;
    };
    Tree = tslib_1.__decorate([
        Component({
            template: vueTreeTemplateHtml,
            props: ["data", "checkbox", "draggable", "nodots", "size", "theme", "dropAllowed", "zindex", "preid"],
        })
    ], Tree);
    return Tree;
}(Vue));
Vue.component("tree", Tree);
