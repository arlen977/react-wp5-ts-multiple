/**
 *获取url参数
 *
 * @author zhaozy
 * @date 2021/04/23
 * @export
 * @param variable
 * @returns {*}
 */
export function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}