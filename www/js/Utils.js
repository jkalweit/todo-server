var Utils;
(function (Utils) {
    function toArray(obj, sortField, ignoreProps) {
        if (sortField === void 0) { sortField = 'key'; }
        if (ignoreProps === void 0) { ignoreProps = ['lastModified']; }
        var array = [];
        if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(function (key) {
                if (ignoreProps.indexOf(key) === -1) {
                    array.push(obj[key]);
                }
            });
            if (sortField) {
                array.sort(function (a, b) {
                    if (a[sortField] < b[sortField])
                        return -1;
                    if (a[sortField] > b[sortField])
                        return 1;
                    return 0;
                });
            }
        }
        return array;
    }
    Utils.toArray = toArray;
    function formatCurrency(value, precision) {
        if (precision === void 0) { precision = 2; }
        var number = (typeof value === 'string') ? parseInt(value) : value;
        return number.toFixed(precision);
    }
    Utils.formatCurrency = formatCurrency;
    function roundToTwo(num) {
        return +(Math.round((num.toString() + 'e+2')) + "e-2");
    }
    Utils.roundToTwo = roundToTwo;
    function snapToGrid(val, grid) {
        var offset = val % grid;
        if (offset < (grid / 2))
            return val - offset;
        else
            return val + (grid - offset);
    }
    Utils.snapToGrid = snapToGrid;
    function arrayContains(list, value) {
        for (var i = 0; i < list.length; ++i) {
            if (list[i] === value)
                return true;
        }
        return false;
    }
    Utils.arrayContains = arrayContains;
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map