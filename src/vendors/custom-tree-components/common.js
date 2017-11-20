/* eslint-disable */
"use strict";
import { __extends, __decorate, __assign } from "tslib";
window.__extends = __extends;
window.__decorate = __decorate;
window.__assign = __assign;
var DoubleClick = /** @class */ (function () {
    function DoubleClick(timeout) {
        if (timeout === void 0) { timeout = 300; }
        this.timeout = timeout;
        this.clicked = false;
        this.timer = null;
    }
    DoubleClick.prototype.onclick = function (singleClick) {
        var _this = this;
        if (!this.clicked) {
            this.clicked = true;
            singleClick();
            this.timer = setTimeout(function () {
                _this.clicked = false;
            }, this.timeout);
        }
        else {
            this.clicked = false;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
    };
    return DoubleClick;
}());
export { DoubleClick };
export function getContainerClassName(noDots) {
    var values = ["tree-container-ul", "tree-children"];
    if (noDots) {
        values.push("tree-no-dots");
    }
    return values.join(" ");
}
export function getNodeClassName(data, last) {
    var values = ["tree-node"];
    if (data.state.openable || data.children.length > 0) {
        if (data.state.opened) {
            values.push("tree-open");
        }
        else {
            values.push("tree-closed");
        }
        if (data.state.loading) {
            values.push("tree-loading");
        }
    }
    else {
        values.push("tree-leaf");
    }
    if (last) {
        values.push("tree-last");
    }
    return values.join(" ");
}
export function getAnchorClassName(data, hovered) {
    var values = ["tree-anchor", "tree-relative"];
    if (data.state.selected) {
        values.push("tree-clicked");
    }
    if (data.state.disabled) {
        values.push("tree-disabled");
    }
    if (data.state.highlighted) {
        values.push("tree-search");
    }
    if (hovered) {
        values.push("tree-hovered");
    }
    return values.join(" ");
}
export function getCheckboxClassName(data) {
    var values = ["tree-icon", "tree-checkbox"];
    if (data.children
        && data.children.some(function (child) { return child.state.selected; })
        && data.children.some(function (child) { return !child.state.selected; })) {
        values.push("tree-undetermined");
    }
    return values.join(" ");
}
export function getRootClassName(checkbox, size, theme) {
    if (theme === void 0) { theme = "default"; }
    var values = ["tree"];
    if (size) {
        values.push("tree-" + theme + "-" + size);
    }
    else {
        values.push("tree-" + theme);
    }
    if (checkbox) {
        values.push("tree-checkbox-selection", "tree-checkbox-no-clicked");
    }
    return values.join(" ");
}
export function getIconClassName(icon) {
    var values = ["tree-icon", "tree-themeicon"];
    if (icon) {
        values.push(icon, "tree-themeicon-custom");
    }
    return values.join(" ");
}
export function getCustomClassName(customClass) {
    var values = ["tree-custom-class"];
    if (customClass) {
        values.push(customClass);
    }
    return values.join(" ");
}
export function getMarkerClassName(data) {
    var values = ["tree-marker-" + data.state.dropPosition];
    if (data.state.dropAllowed) {
        values.push("allowed");
    }
    else {
        values.push("not-allowed");
    }
    return values.join(" ");
}
/**
 * @public
 */
export function getNodeFromPath(rootData, path) {
    var node = null;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var index = path_1[_i];
        node = node ? node.children[index] : rootData[index];
    }
    return node;
}
function getDropPosition(pageY, offsetTop, offsetHeight) {
    var top = pageY - offsetTop;
    if (top < offsetHeight / 3) {
        return 1 /* up */;
    }
    else if (top > offsetHeight * 2 / 3) {
        return 3 /* down */;
    }
    else {
        return 2 /* inside */;
    }
}
function clearDropPositionOfTree(tree) {
    if (tree.state.dropPosition) {
        tree.state.dropPosition = 0 /* empty */;
    }
    if (tree.children) {
        for (var _i = 0, _a = tree.children; _i < _a.length; _i++) {
            var child = _a[_i];
            clearDropPositionOfTree(child);
        }
    }
}
export function ondrag(pageY, dragTarget, dropTarget, data, dropAllowed, next) {
    if (dropTarget) {
        var sourcePath = dragTarget.dataset.path.split(",").map(function (s) { return +s; });
        var dropTargetPathString = dropTarget.dataset.path;
        if (dropTargetPathString) {
            var targetPath = dropTargetPathString.split(",").map(function (s) { return +s; });
            var targetData = getNodeFromPath(data, targetPath);
            var sourceData = getNodeFromPath(data, sourcePath);
            var position = getDropPosition(pageY, dropTarget.offsetTop, dropTarget.offsetHeight);
            if (targetData.state.dropPosition !== position) {
                targetData.state.dropPosition = position;
                var dropData = {
                    sourcePath: sourcePath,
                    targetPath: targetPath,
                    sourceData: sourceData,
                    targetData: targetData,
                };
                targetData.state.dropAllowed = dropAllowed ? dropAllowed(dropData) : true;
                if (next) {
                    next();
                }
            }
        }
    }
}
export function ondragleave(target, data) {
    var pathString = target.dataset.path;
    if (pathString) {
        var path = pathString.split(",").map(function (s) { return +s; });
        var node = getNodeFromPath(data, path);
        if (node.state.dropPosition !== 0 /* empty */) {
            node.state.dropPosition = 0 /* empty */;
        }
    }
}
export function ondrop(target, dragTarget, data, next) {
    var sourcePath = dragTarget.dataset.path.split(",").map(function (s) { return +s; });
    var targetPathString = target.dataset.path;
    if (targetPathString) {
        var targetPath = targetPathString.split(",").map(function (s) { return +s; });
        var targetData = getNodeFromPath(data, targetPath);
        var sourceData = getNodeFromPath(data, sourcePath);
        if (targetData.state.dropPosition !== 0 /* empty */) {
            var dropData = {
                sourcePath: sourcePath,
                targetPath: targetPath,
                sourceData: sourceData,
                targetData: targetData,
            };
            next(dropData);
        }
    }
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var node = data_1[_i];
        clearDropPositionOfTree(node);
    }
}
export function clearMarkerOfTree(tree) {
    if (tree.state.dropPosition !== 0 /* empty */) {
        tree.state.dropPosition = 0 /* empty */;
    }
    if (tree.children) {
        for (var _i = 0, _a = tree.children; _i < _a.length; _i++) {
            var child = _a[_i];
            clearMarkerOfTree(child);
        }
    }
}
export function getId(path, preid) {
    return preid ? preid + path.join("-") : undefined;
}
