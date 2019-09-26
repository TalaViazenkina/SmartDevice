function t(t){return"string"==typeof t||t instanceof String}var e={NONE:"NONE",LEFT:"LEFT",FORCE_LEFT:"FORCE_LEFT",RIGHT:"RIGHT",FORCE_RIGHT:"FORCE_RIGHT"};function s(t){return t.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}var r="undefined"!=typeof window&&window||"undefined"!=typeof global&&global.global===global&&global||"undefined"!=typeof self&&self.self===self&&self||{};function a(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function u(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,r)}return s}function i(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?u(s,!0).forEach(function(e){a(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):u(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}function n(t,e){if(null==t)return{};var s,r,a=function(t,e){if(null==t)return{};var s,r,a={},u=Object.keys(t);for(r=0;r<u.length;r++)s=u[r],e.indexOf(s)>=0||(a[s]=t[s]);return a}(t,e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);for(r=0;r<u.length;r++)s=u[r],e.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(t,s)&&(a[s]=t[s])}return a}class h{constructor(t,e,s,r){for(this.value=t,this.cursorPos=e,this.oldValue=s,this.oldSelection=r;this.value.slice(0,this.startChangePos)!==this.oldValue.slice(0,this.startChangePos);)--this.oldSelection.start}get startChangePos(){return Math.min(this.cursorPos,this.oldSelection.start)}get insertedCount(){return this.cursorPos-this.startChangePos}get inserted(){return this.value.substr(this.startChangePos,this.insertedCount)}get removedCount(){return Math.max(this.oldSelection.end-this.startChangePos||this.oldValue.length-this.value.length,0)}get removed(){return this.oldValue.substr(this.startChangePos,this.removedCount)}get head(){return this.value.substring(0,this.startChangePos)}get tail(){return this.value.substring(this.startChangePos+this.insertedCount)}get removeDirection(){return!this.removedCount||this.insertedCount?e.NONE:this.oldSelection.end===this.cursorPos||this.oldSelection.start===this.cursorPos?e.RIGHT:e.LEFT}}class l{constructor(t){Object.assign(this,{inserted:"",rawInserted:"",skip:!1,tailShift:0},t)}aggregate(t){return this.rawInserted+=t.rawInserted,this.skip=this.skip||t.skip,this.inserted+=t.inserted,this.tailShift+=t.tailShift,this}get offset(){return this.tailShift+this.inserted.length}}class o{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2?arguments[2]:void 0;this.value=t,this.from=e,this.stop=s}toString(){return this.value}extend(t){this.value+=String(t)}appendTo(t){return t.append(this.toString(),{tail:!0}).aggregate(t._appendPlaceholder())}get state(){return{value:this.value,from:this.from,stop:this.stop}}set state(t){Object.assign(this,t)}shiftBefore(t){if(this.from>=t||!this.value.length)return"";var e=this.value[0];return this.value=this.value.slice(1),e}}class d{constructor(t){this._value="",this._update(t),this.isInitialized=!0}updateOptions(t){Object.keys(t).length&&this.withValueRefresh(this._update.bind(this,t))}_update(t){Object.assign(this,t)}get state(){return{_value:this.value}}set state(t){this._value=t._value}reset(){this._value=""}get value(){return this._value}set value(t){this.resolve(t)}resolve(t){return this.reset(),this.append(t,{input:!0},""),this.doCommit(),this.value}get unmaskedValue(){return this.value}set unmaskedValue(t){this.reset(),this.append(t,{},""),this.doCommit()}get typedValue(){return this.unmaskedValue}set typedValue(t){this.unmaskedValue=t}get rawInputValue(){return this.extractInput(0,this.value.length,{raw:!0})}set rawInputValue(t){this.reset(),this.append(t,{raw:!0},""),this.doCommit()}get isComplete(){return!0}nearestInputPos(t,e){return t}extractInput(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length;return this.value.slice(t,e)}extractTail(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length;return new o(this.extractInput(t,e),t)}appendTail(e){return t(e)&&(e=new o(String(e))),e.appendTo(this)}_appendCharRaw(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(t=this.doPrepare(t,e))?(this._value+=t,new l({inserted:t,rawInserted:t})):new l}_appendChar(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments.length>2?arguments[2]:void 0,r=this.state,a=this._appendCharRaw(t,e);if(a.inserted){var u,i=!1!==this.doValidate(e);if(i&&null!=s){var n=this.state;this.overwrite&&(u=s.state,s.shiftBefore(this.value.length));var h=this.appendTail(s);(i=h.rawInserted===s.toString())&&h.inserted&&(this.state=n)}i||(a.rawInserted=a.inserted="",this.state=r,s&&u&&(s.state=u))}return a}_appendPlaceholder(){return new l}append(e,s,r){if(!t(e))throw new Error("value should be string");var a=new l,u=t(r)?new o(String(r)):r;s.tail&&(s._beforeTailState=this.state);for(var i=0;i<e.length;++i)a.aggregate(this._appendChar(e[i],s,u));return null!=u&&(a.tailShift+=this.appendTail(u).tailShift),a}remove(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length;return this._value=this.value.slice(0,t)+this.value.slice(e),new l}withValueRefresh(t){if(this._refreshing||!this.isInitialized)return t();this._refreshing=!0;var e=this.unmaskedValue,s=this.value,r=t();return this.resolve(s)!==s&&(this.unmaskedValue=e),delete this._refreshing,r}doPrepare(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.prepare?this.prepare(t,this,e):t}doValidate(t){return(!this.validate||this.validate(this.value,this,t))&&(!this.parent||this.parent.doValidate(t))}doCommit(){this.commit&&this.commit(this.value,this)}splice(t,e,s,r){var a=t+e,u=this.extractTail(a),i=this.nearestInputPos(t,r);return new l({tailShift:i-t}).aggregate(this.remove(i)).aggregate(this.append(s,{input:!0},u))}}function p(e){if(null==e)throw new Error("mask property should be defined");return e instanceof RegExp?r.IMask.MaskedRegExp:t(e)?r.IMask.MaskedPattern:e instanceof Date||e===Date?r.IMask.MaskedDate:e instanceof Number||"number"==typeof e||e===Number?r.IMask.MaskedNumber:Array.isArray(e)||e===Array?r.IMask.MaskedDynamic:e.prototype instanceof r.IMask.Masked?e:e instanceof Function?r.IMask.MaskedFunction:(console.warn("Mask not found for mask",e),r.IMask.Masked)}function c(t){var e=(t=i({},t)).mask;return e instanceof r.IMask.Masked?e:new(p(e))(t)}var g={0:/\d/,a:/[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,"*":/./};class v{constructor(t){var{mask:e}=t,s=n(t,["mask"]);this.masked=c({mask:e}),Object.assign(this,s)}reset(){this._isFilled=!1,this.masked.reset()}remove(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length;return 0===t&&e>=1?(this._isFilled=!1,this.masked.remove(t,e)):new l}get value(){return this.masked.value||(this._isFilled&&!this.isOptional?this.placeholderChar:"")}get unmaskedValue(){return this.masked.unmaskedValue}get isComplete(){return Boolean(this.masked.value)||this.isOptional}_appendChar(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this._isFilled)return new l;var s=this.masked.state,r=this.masked._appendChar(t,e);return r.inserted&&!1===this.doValidate(e)&&(r.inserted=r.rawInserted="",this.masked.state=s),r.inserted||this.isOptional||this.lazy||e.input||(r.inserted=this.placeholderChar),r.skip=!r.inserted&&!this.isOptional,this._isFilled=Boolean(r.inserted),r}append(){return this.masked.append(...arguments)}_appendPlaceholder(){var t=new l;return this._isFilled||this.isOptional?t:(this._isFilled=!0,t.inserted=this.placeholderChar,t)}extractTail(){return this.masked.extractTail(...arguments)}appendTail(){return this.masked.appendTail(...arguments)}extractInput(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length,s=arguments.length>2?arguments[2]:void 0;return this.masked.extractInput(t,e,s)}nearestInputPos(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.NONE,r=this.value.length,a=Math.min(Math.max(t,0),r);switch(s){case e.LEFT:case e.FORCE_LEFT:return this.isComplete?a:0;case e.RIGHT:case e.FORCE_RIGHT:return this.isComplete?a:r;case e.NONE:default:return a}}doValidate(){return this.masked.doValidate(...arguments)&&(!this.parent||this.parent.doValidate(...arguments))}doCommit(){this.masked.doCommit()}get state(){return{masked:this.masked.state,_isFilled:this._isFilled}}set state(t){this.masked.state=t.masked,this._isFilled=t._isFilled}}class m{constructor(t){Object.assign(this,t),this._value=""}get value(){return this._value}get unmaskedValue(){return this.isUnmasking?this.value:""}reset(){this._isRawInput=!1,this._value=""}remove(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._value.length;return this._value=this._value.slice(0,t)+this._value.slice(e),this._value||(this._isRawInput=!1),new l}nearestInputPos(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.NONE,r=this._value.length;switch(s){case e.LEFT:case e.FORCE_LEFT:return 0;case e.NONE:case e.RIGHT:case e.FORCE_RIGHT:default:return r}}extractInput(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._value.length;return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).raw&&this._isRawInput&&this._value.slice(t,e)||""}get isComplete(){return!0}_appendChar(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=new l;if(this._value)return s;var r=this.char===t[0]&&(this.isUnmasking||e.input||e.raw)&&!e.tail;return r&&(s.rawInserted=this.char),this._value=s.inserted=this.char,this._isRawInput=r&&(e.raw||e.input),s}_appendPlaceholder(){var t=new l;return this._value?t:(this._value=t.inserted=this.char,t)}extractTail(){arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length;return new o("")}appendTail(e){return t(e)&&(e=new o(String(e))),e.appendTo(this)}append(t,e,s){var r=this._appendChar(t,e);return null!=s&&(r.tailShift+=this.appendTail(s).tailShift),r}doCommit(){}get state(){return{_value:this._value,_isRawInput:this._isRawInput}}set state(t){Object.assign(this,t)}}class k{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.chunks=t,this.from=e}toString(){return this.chunks.map(String).join("")}extend(e){if(String(e)){t(e)&&(e=new o(String(e)));var s=this.chunks[this.chunks.length-1],r=s&&(s.stop===e.stop||null==e.stop)&&e.from===s.from+s.toString().length;if(e instanceof o)r?s.extend(e.toString()):this.chunks.push(e);else if(e instanceof k){if(null==e.stop)for(var a;e.chunks.length&&null==e.chunks[0].stop;)(a=e.chunks.shift()).from+=e.from,this.extend(a);e.toString()&&(e.stop=e.blockIndex,this.chunks.push(e))}}}appendTo(t){if(!(t instanceof r.IMask.MaskedPattern))return new o(this.toString()).appendTo(t);for(var e=new l,s=0;s<this.chunks.length&&!e.skip;++s){var a=this.chunks[s],u=t._mapPosToBlock(t.value.length),i=a.stop,n=void 0;if(i&&(!u||u.index<=i)&&((a instanceof k||t._stops.indexOf(i)>=0)&&e.aggregate(t._appendPlaceholder(i)),n=a instanceof k&&t._blocks[i]),n){var h=n.appendTail(a);h.skip=!1,e.aggregate(h),t._value+=h.inserted;var d=a.toString().slice(h.rawInserted.length);d&&e.aggregate(t.append(d,{tail:!0}))}else e.aggregate(t.append(a.toString(),{tail:!0}))}return e}get state(){return{chunks:this.chunks.map(t=>t.state),from:this.from,stop:this.stop,blockIndex:this.blockIndex}}set state(t){var{chunks:e}=t,s=n(t,["chunks"]);Object.assign(this,s),this.chunks=e.map(t=>{var e="chunks"in t?new k:new o;return e.state=t,e})}shiftBefore(t){if(this.from>=t||!this.chunks.length)return"";for(var e=t-this.from,s=0;s<this.chunks.length;){var r=this.chunks[s],a=r.shiftBefore(e);if(r.toString()){if(!a)break;++s}else this.chunks.splice(s,1);if(a)return a}return""}}class _ extends d{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.definitions=Object.assign({},g,t.definitions),super(i({},_.DEFAULTS,{},t))}_update(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.definitions=Object.assign({},this.definitions,t.definitions),super._update(t),this._rebuildMask()}_rebuildMask(){var t=this,e=this.definitions;this._blocks=[],this._stops=[],this._maskedBlocks={};var s=this.mask;if(s&&e)for(var r=!1,a=!1,u=0;u<s.length;++u){if(this.blocks)if("continue"===function(){var e=s.slice(u),r=Object.keys(t.blocks).filter(t=>0===e.indexOf(t));r.sort((t,e)=>e.length-t.length);var a=r[0];if(a){var n=c(i({parent:t,lazy:t.lazy,placeholderChar:t.placeholderChar,overwrite:t.overwrite},t.blocks[a]));return n&&(t._blocks.push(n),t._maskedBlocks[a]||(t._maskedBlocks[a]=[]),t._maskedBlocks[a].push(t._blocks.length-1)),u+=a.length-1,"continue"}}())continue;var n=s[u],h=n in e;if(n!==_.STOP_CHAR)if("{"!==n&&"}"!==n)if("["!==n&&"]"!==n){if(n===_.ESCAPE_CHAR){if(!(n=s[++u]))break;h=!1}var l=h?new v({parent:this,lazy:this.lazy,placeholderChar:this.placeholderChar,mask:e[n],isOptional:a}):new m({char:n,isUnmasking:r});this._blocks.push(l)}else a=!a;else r=!r;else this._stops.push(this._blocks.length)}}get state(){return i({},super.state,{_blocks:this._blocks.map(t=>t.state)})}set state(t){var{_blocks:e}=t,s=n(t,["_blocks"]);this._blocks.forEach((t,s)=>t.state=e[s]),super.state=s}reset(){super.reset(),this._blocks.forEach(t=>t.reset())}get isComplete(){return this._blocks.every(t=>t.isComplete)}doCommit(){this._blocks.forEach(t=>t.doCommit()),super.doCommit()}get unmaskedValue(){return this._blocks.reduce((t,e)=>t+=e.unmaskedValue,"")}set unmaskedValue(t){super.unmaskedValue=t}get value(){return this._blocks.reduce((t,e)=>t+=e.value,"")}set value(t){super.value=t}appendTail(t){return super.appendTail(t).aggregate(this._appendPlaceholder())}_appendCharRaw(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t=this.doPrepare(t,e);var s=this._mapPosToBlock(this.value.length),r=new l;if(!s)return r;for(var a=s.index;;++a){var u=this._blocks[a];if(!u)break;var i=u._appendChar(t,e),n=i.skip;if(r.aggregate(i),n||i.rawInserted)break}return r}extractTail(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length,s=new k;return t===e?s:(this._forEachBlocksInRange(t,e,(t,e,r,a)=>{var u=t.extractTail(r,a);u.stop=this._findStopBefore(e),u.from=this._blockStartPos(e),u instanceof k&&(u.blockIndex=e),s.extend(u)}),s)}extractInput(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(t===e)return"";var r="";return this._forEachBlocksInRange(t,e,(t,e,a,u)=>{r+=t.extractInput(a,u,s)}),r}_findStopBefore(t){for(var e,s=0;s<this._stops.length;++s){var r=this._stops[s];if(!(r<=t))break;e=r}return e}_appendPlaceholder(t){var e=new l;if(this.lazy&&null==t)return e;var s=this._mapPosToBlock(this.value.length);if(!s)return e;var r=s.index,a=null!=t?t:this._blocks.length;return this._blocks.slice(r,a).forEach(s=>{if(!s.lazy||null!=t){var r=null!=s._blocks?[s._blocks.length]:[],a=s._appendPlaceholder(...r);this._value+=a.inserted,e.aggregate(a)}}),e}_mapPosToBlock(t){for(var e="",s=0;s<this._blocks.length;++s){var r=this._blocks[s],a=e.length;if(t<=(e+=r.value).length)return{index:s,offset:t-a}}}_blockStartPos(t){return this._blocks.slice(0,t).reduce((t,e)=>t+=e.value.length,0)}_forEachBlocksInRange(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length,s=arguments.length>2?arguments[2]:void 0,r=this._mapPosToBlock(t);if(r){var a=this._mapPosToBlock(e),u=a&&r.index===a.index,i=r.offset,n=a&&u?a.offset:this._blocks[r.index].value.length;if(s(this._blocks[r.index],r.index,i,n),a&&!u){for(var h=r.index+1;h<a.index;++h)s(this._blocks[h],h,0,this._blocks[h].value.length);s(this._blocks[a.index],a.index,0,a.offset)}}}remove(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length,s=super.remove(t,e);return this._forEachBlocksInRange(t,e,(t,e,r,a)=>{s.aggregate(t.remove(r,a))}),s}nearestInputPos(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.NONE,r=this._mapPosToBlock(t)||{index:0,offset:0},{offset:a,index:u}=r,i=this._blocks[u];if(!i)return t;var n=a;0!==n&&n<i.value.length&&(n=i.nearestInputPos(a,function(t){switch(t){case e.LEFT:return e.FORCE_LEFT;case e.RIGHT:return e.FORCE_RIGHT;default:return t}}(s)));var h=n===i.value.length;if(!(0===n)&&!h)return this._blockStartPos(u)+n;var l=h?u+1:u;if(s===e.NONE){if(l>0){var o=l-1,d=this._blocks[o],p=d.nearestInputPos(0,e.NONE);if(!d.value.length||p!==d.value.length)return this._blockStartPos(l)}for(var c=l;c<this._blocks.length;++c){var g=this._blocks[c],v=g.nearestInputPos(0,e.NONE);if(!g.value.length||v!==g.value.length)return this._blockStartPos(c)+v}for(var m=l-1;m>=0;--m){var k=this._blocks[m],_=k.nearestInputPos(0,e.NONE);if(!k.value.length||_!==k.value.length)return this._blockStartPos(m)+k.value.length}return t}if(s===e.LEFT||s===e.FORCE_LEFT){for(var f,A=l;A<this._blocks.length;++A)if(this._blocks[A].value){f=A;break}if(null!=f){var C=this._blocks[f],F=C.nearestInputPos(0,e.RIGHT);if(0===F&&C.unmaskedValue.length)return this._blockStartPos(f)+F}for(var E,b=-1,D=l-1;D>=0;--D){var B=this._blocks[D],S=B.nearestInputPos(B.value.length,e.FORCE_LEFT);if(B.value&&0===S||(E=D),0!==S){if(S!==B.value.length)return this._blockStartPos(D)+S;b=D;break}}if(s===e.LEFT)for(var x=b+1;x<=Math.min(l,this._blocks.length-1);++x){var w=this._blocks[x],T=w.nearestInputPos(0,e.NONE),P=this._blockStartPos(x)+T;if(P>t)break;if(T!==w.value.length)return P}if(b>=0)return this._blockStartPos(b)+this._blocks[b].value.length;if(s===e.FORCE_LEFT||this.lazy&&!this.extractInput()&&!function(t){if(!t)return!1;var s=t.value;return!s||t.nearestInputPos(0,e.NONE)!==s.length}(this._blocks[l]))return 0;if(null!=E)return this._blockStartPos(E);for(var M=l;M<this._blocks.length;++M){var I=this._blocks[M],O=I.nearestInputPos(0,e.NONE);if(!I.value.length||O!==I.value.length)return this._blockStartPos(M)+O}return 0}if(s===e.RIGHT||s===e.FORCE_RIGHT){for(var y,V,R=l;R<this._blocks.length;++R){var N=this._blocks[R],L=N.nearestInputPos(0,e.NONE);if(L!==N.value.length){V=this._blockStartPos(R)+L,y=R;break}}if(null!=y&&null!=V){for(var j=y;j<this._blocks.length;++j){var H=this._blocks[j],G=H.nearestInputPos(0,e.FORCE_RIGHT);if(G!==H.value.length)return this._blockStartPos(j)+G}return s===e.FORCE_RIGHT?this.value.length:V}for(var U=Math.min(l,this._blocks.length-1);U>=0;--U){var z=this._blocks[U],Y=z.nearestInputPos(z.value.length,e.LEFT);if(0!==Y){var Z=this._blockStartPos(U)+Y;if(Z>=t)return Z;break}}}return t}maskedBlock(t){return this.maskedBlocks(t)[0]}maskedBlocks(t){var e=this._maskedBlocks[t];return e?e.map(t=>this._blocks[t]):[]}}_.DEFAULTS={lazy:!0,placeholderChar:"_"},_.STOP_CHAR="`",_.ESCAPE_CHAR="\\",_.InputDefinition=v,_.FixedDefinition=m;class f extends _{get _matchFrom(){return this.maxLength-String(this.from).length}_update(t){t=i({to:this.to||0,from:this.from||0},t);var e=String(t.to).length;null!=t.maxLength&&(e=Math.max(e,t.maxLength)),t.maxLength=e;for(var s=String(t.from).padStart(e,"0"),r=String(t.to).padStart(e,"0"),a=0;a<r.length&&r[a]===s[a];)++a;t.mask=r.slice(0,a).replace(/0/g,"\\0")+"0".repeat(e-a),super._update(t)}get isComplete(){return super.isComplete&&Boolean(this.value)}boundaries(t){var e="",s="",[,r,a]=t.match(/^(\D*)(\d*)(\D*)/)||[];return a&&(e="0".repeat(r.length)+a,s="9".repeat(r.length)+a),[e=e.padEnd(this.maxLength,"0"),s=s.padEnd(this.maxLength,"9")]}doPrepare(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t=super.doPrepare(t,e).replace(/\D/g,""),!this.autofix)return t;for(var s=String(this.from).padStart(this.maxLength,"0"),r=String(this.to).padStart(this.maxLength,"0"),a=this.value,u="",i=0;i<t.length;++i){var n=a+u+t[i],[h,l]=this.boundaries(n);Number(l)<this.from?u+=s[n.length-1]:Number(h)>this.to?u+=r[n.length-1]:u+=t[i]}return u}doValidate(){var t=this.value;if(-1===t.search(/[^0]/)&&t.length<=this._matchFrom)return!0;var[e,s]=this.boundaries(t);return this.from<=Number(s)&&Number(e)<=this.to&&super.doValidate(...arguments)}}class A extends _{constructor(t){super(i({},A.DEFAULTS,{},t))}_update(t){t.mask===Date&&delete t.mask,t.pattern&&(t.mask=t.pattern);var e=t.blocks;t.blocks=Object.assign({},A.GET_DEFAULT_BLOCKS()),t.min&&(t.blocks.Y.from=t.min.getFullYear()),t.max&&(t.blocks.Y.to=t.max.getFullYear()),t.min&&t.max&&t.blocks.Y.from===t.blocks.Y.to&&(t.blocks.m.from=t.min.getMonth()+1,t.blocks.m.to=t.max.getMonth()+1,t.blocks.m.from===t.blocks.m.to&&(t.blocks.d.from=t.min.getDate(),t.blocks.d.to=t.max.getDate())),Object.assign(t.blocks,e),Object.keys(t.blocks).forEach(e=>{var s=t.blocks[e];"autofix"in s||(s.autofix=t.autofix)}),super._update(t)}doValidate(){var t=this.date;return super.doValidate(...arguments)&&(!this.isComplete||this.isDateExist(this.value)&&null!=t&&(null==this.min||this.min<=t)&&(null==this.max||t<=this.max))}isDateExist(t){return this.format(this.parse(t))===t}get date(){return this.isComplete?this.parse(this.value):null}set date(t){this.value=this.format(t)}get typedValue(){return this.date}set typedValue(t){this.date=t}}A.DEFAULTS={pattern:"d{.}`m{.}`Y",format:t=>{return[String(t.getDate()).padStart(2,"0"),String(t.getMonth()+1).padStart(2,"0"),t.getFullYear()].join(".")},parse:t=>{var[e,s,r]=t.split(".");return new Date(r,s-1,e)}},A.GET_DEFAULT_BLOCKS=()=>({d:{mask:f,from:1,to:31,maxLength:2},m:{mask:f,from:1,to:12,maxLength:2},Y:{mask:f,from:1900,to:9999}});class C{get selectionStart(){var t;try{t=this._unsafeSelectionStart}catch(t){}return null!=t?t:this.value.length}get selectionEnd(){var t;try{t=this._unsafeSelectionEnd}catch(t){}return null!=t?t:this.value.length}select(t,e){if(null!=t&&null!=e&&(t!==this.selectionStart||e!==this.selectionEnd))try{this._unsafeSelect(t,e)}catch(t){}}_unsafeSelect(t,e){}get isActive(){return!1}bindEvents(t){}unbindEvents(){}}class F extends C{constructor(t){super(),this.input=t,this._handlers={}}get isActive(){return this.input===document.activeElement}get _unsafeSelectionStart(){return this.input.selectionStart}get _unsafeSelectionEnd(){return this.input.selectionEnd}_unsafeSelect(t,e){this.input.setSelectionRange(t,e)}get value(){return this.input.value}set value(t){this.input.value=t}bindEvents(t){Object.keys(t).forEach(e=>this._toggleEventHandler(F.EVENTS_MAP[e],t[e]))}unbindEvents(){Object.keys(this._handlers).forEach(t=>this._toggleEventHandler(t))}_toggleEventHandler(t,e){this._handlers[t]&&(this.input.removeEventListener(t,this._handlers[t]),delete this._handlers[t]),e&&(this.input.addEventListener(t,e),this._handlers[t]=e)}}F.EVENTS_MAP={selectionChange:"keydown",input:"input",drop:"drop",click:"click",focus:"focus",commit:"blur"};class E{constructor(t,e){this.el=t instanceof C?t:new F(t),this.masked=c(e),this._listeners={},this._value="",this._unmaskedValue="",this._saveSelection=this._saveSelection.bind(this),this._onInput=this._onInput.bind(this),this._onChange=this._onChange.bind(this),this._onDrop=this._onDrop.bind(this),this._onFocus=this._onFocus.bind(this),this.alignCursor=this.alignCursor.bind(this),this.alignCursorFriendly=this.alignCursorFriendly.bind(this),this._bindEvents(),this.updateValue(),this._onChange()}get mask(){return this.masked.mask}maskEquals(t){return null==t||t===this.masked.mask||t===Date&&this.masked instanceof A}set mask(t){if(!this.maskEquals(t))if(this.masked.constructor!==p(t)){var e=c({mask:t});e.unmaskedValue=this.masked.unmaskedValue,this.masked=e}else this.masked.updateOptions({mask:t})}get value(){return this._value}set value(t){this.masked.value=t,this.updateControl(),this.alignCursor()}get unmaskedValue(){return this._unmaskedValue}set unmaskedValue(t){this.masked.unmaskedValue=t,this.updateControl(),this.alignCursor()}get typedValue(){return this.masked.typedValue}set typedValue(t){this.masked.typedValue=t,this.updateControl(),this.alignCursor()}_bindEvents(){this.el.bindEvents({selectionChange:this._saveSelection,input:this._onInput,drop:this._onDrop,click:this.alignCursorFriendly,focus:this._onFocus,commit:this._onChange})}_unbindEvents(){this.el.unbindEvents()}_fireEvent(t){var e=this._listeners[t];e&&e.forEach(t=>t())}get selectionStart(){return this._cursorChanging?this._changingCursorPos:this.el.selectionStart}get cursorPos(){return this._cursorChanging?this._changingCursorPos:this.el.selectionEnd}set cursorPos(t){this.el.isActive&&(this.el.select(t,t),this._saveSelection())}_saveSelection(){this.value!==this.el.value&&console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."),this._selection={start:this.selectionStart,end:this.cursorPos}}updateValue(){this.masked.value=this.el.value,this._value=this.masked.value}updateControl(){var t=this.masked.unmaskedValue,e=this.masked.value,s=this.unmaskedValue!==t||this.value!==e;this._unmaskedValue=t,this._value=e,this.el.value!==e&&(this.el.value=e),s&&this._fireChangeEvents()}updateOptions(t){var{mask:e}=t,s=n(t,["mask"]),r=!this.maskEquals(e),a=!function t(e,s){if(s===e)return!0;var r,a=Array.isArray(s),u=Array.isArray(e);if(a&&u){if(s.length!=e.length)return!1;for(r=0;r<s.length;r++)if(!t(s[r],e[r]))return!1;return!0}if(a!=u)return!1;if(s&&e&&"object"==typeof s&&"object"==typeof e){var i=s instanceof Date,n=e instanceof Date;if(i&&n)return s.getTime()==e.getTime();if(i!=n)return!1;var h=s instanceof RegExp,l=e instanceof RegExp;if(h&&l)return s.toString()==e.toString();if(h!=l)return!1;var o=Object.keys(s);for(r=0;r<o.length;r++)if(!Object.prototype.hasOwnProperty.call(e,o[r]))return!1;for(r=0;r<o.length;r++)if(!t(e[o[r]],s[o[r]]))return!1;return!0}return!(!s||!e||"function"!=typeof s||"function"!=typeof e)&&s.toString()===e.toString()}(this.masked,s);r&&(this.mask=e),a&&this.masked.updateOptions(s),(r||a)&&this.updateControl()}updateCursor(t){null!=t&&(this.cursorPos=t,this._delayUpdateCursor(t))}_delayUpdateCursor(t){this._abortUpdateCursor(),this._changingCursorPos=t,this._cursorChanging=setTimeout(()=>{this.el&&(this.cursorPos=this._changingCursorPos,this._abortUpdateCursor())},10)}_fireChangeEvents(){this._fireEvent("accept"),this.masked.isComplete&&this._fireEvent("complete")}_abortUpdateCursor(){this._cursorChanging&&(clearTimeout(this._cursorChanging),delete this._cursorChanging)}alignCursor(){this.cursorPos=this.masked.nearestInputPos(this.cursorPos,e.LEFT)}alignCursorFriendly(){this.selectionStart===this.cursorPos&&this.alignCursor()}on(t,e){return this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e),this}off(t,e){if(!this._listeners[t])return this;if(!e)return delete this._listeners[t],this;var s=this._listeners[t].indexOf(e);return s>=0&&this._listeners[t].splice(s,1),this}_onInput(){if(this._abortUpdateCursor(),!this._selection)return this.updateValue();var t=new h(this.el.value,this.cursorPos,this.value,this._selection),s=this.masked.rawInputValue,r=this.masked.splice(t.startChangePos,t.removed.length,t.inserted,t.removeDirection).offset,a=s===this.masked.rawInputValue?t.removeDirection:e.NONE,u=this.masked.nearestInputPos(t.startChangePos+r,a);this.updateControl(),this.updateCursor(u)}_onChange(){this.value!==this.el.value&&this.updateValue(),this.masked.doCommit(),this.updateControl(),this._saveSelection()}_onDrop(t){t.preventDefault(),t.stopPropagation()}_onFocus(t){this.selectionStart===this.cursorPos&&(this._selection&&(this.cursorPos=this._selection.end),this.alignCursorFriendly())}destroy(){this._unbindEvents(),this._listeners.length=0,delete this.el}}class b extends _{_update(t){t.enum&&(t.mask="*".repeat(t.enum[0].length)),super._update(t)}doValidate(){return this.enum.some(t=>t.indexOf(this.unmaskedValue)>=0)&&super.doValidate(...arguments)}}class D extends d{constructor(t){super(i({},D.DEFAULTS,{},t))}_update(t){super._update(t),this._updateRegExps()}_updateRegExps(){var t="^"+(this.allowNegative?"[+|\\-]?":""),e=(this.scale?"("+s(this.radix)+"\\d{0,"+this.scale+"})?":"")+"$";this._numberRegExpInput=new RegExp(t+"(0|([1-9]+\\d*))?"+e),this._numberRegExp=new RegExp(t+"\\d*"+e),this._mapToRadixRegExp=new RegExp("["+this.mapToRadix.map(s).join("")+"]","g"),this._thousandsSeparatorRegExp=new RegExp(s(this.thousandsSeparator),"g")}_removeThousandsSeparators(t){return t.replace(this._thousandsSeparatorRegExp,"")}_insertThousandsSeparators(t){var e=t.split(this.radix);return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,this.thousandsSeparator),e.join(this.radix)}doPrepare(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),r=1;r<e;r++)s[r-1]=arguments[r];return super.doPrepare(this._removeThousandsSeparators(t.replace(this._mapToRadixRegExp,this.radix)),...s)}_separatorsCount(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=0,r=0;r<t;++r)this._value.indexOf(this.thousandsSeparator,r)===r&&(++s,e&&(t+=this.thousandsSeparator.length));return s}_separatorsCountFromSlice(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._value;return this._separatorsCount(this._removeThousandsSeparators(t).length,!0)}extractInput(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length,s=arguments.length>2?arguments[2]:void 0;return[t,e]=this._adjustRangeWithSeparators(t,e),this._removeThousandsSeparators(super.extractInput(t,e,s))}_appendCharRaw(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this.thousandsSeparator)return super._appendCharRaw(t,e);var s=e.tail&&e._beforeTailState?e._beforeTailState._value:this._value,r=this._separatorsCountFromSlice(s);this._value=this._removeThousandsSeparators(this.value);var a=super._appendCharRaw(t,e);this._value=this._insertThousandsSeparators(this._value);var u=e.tail&&e._beforeTailState?e._beforeTailState._value:this._value,i=this._separatorsCountFromSlice(u);return a.tailShift+=(i-r)*this.thousandsSeparator.length,a}_findSeparatorAround(t){if(this.thousandsSeparator){var e=t-this.thousandsSeparator.length+1,s=this.value.indexOf(this.thousandsSeparator,e);if(s<=t)return s}return-1}_adjustRangeWithSeparators(t,e){var s=this._findSeparatorAround(t);s>=0&&(t=s);var r=this._findSeparatorAround(e);return r>=0&&(e=r+this.thousandsSeparator.length),[t,e]}remove(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.value.length;[t,e]=this._adjustRangeWithSeparators(t,e);var s=this.value.slice(0,t),r=this.value.slice(e),a=this._separatorsCount(s.length);this._value=this._insertThousandsSeparators(this._removeThousandsSeparators(s+r));var u=this._separatorsCountFromSlice(s);return new l({tailShift:(u-a)*this.thousandsSeparator.length})}nearestInputPos(t,s){if(!this.thousandsSeparator)return t;switch(s){case e.NONE:case e.LEFT:case e.FORCE_LEFT:var r=this._findSeparatorAround(t-1);if(r>=0){var a=r+this.thousandsSeparator.length;if(t<a||this.value.length<=a||s===e.FORCE_LEFT)return r}break;case e.RIGHT:case e.FORCE_RIGHT:var u=this._findSeparatorAround(t);if(u>=0)return u+this.thousandsSeparator.length}return t}doValidate(t){var e=(t.input?this._numberRegExpInput:this._numberRegExp).test(this._removeThousandsSeparators(this.value));if(e){var s=this.number;e=e&&!isNaN(s)&&(null==this.min||this.min>=0||this.min<=this.number)&&(null==this.max||this.max<=0||this.number<=this.max)}return e&&super.doValidate(t)}doCommit(){if(this.value){var t=this.number,e=t;null!=this.min&&(e=Math.max(e,this.min)),null!=this.max&&(e=Math.min(e,this.max)),e!==t&&(this.unmaskedValue=String(e));var s=this.value;this.normalizeZeros&&(s=this._normalizeZeros(s)),this.padFractionalZeros&&(s=this._padFractionalZeros(s)),this._value=s}super.doCommit()}_normalizeZeros(t){var e=this._removeThousandsSeparators(t).split(this.radix);return e[0]=e[0].replace(/^(\D*)(0*)(\d*)/,(t,e,s,r)=>e+r),t.length&&!/\d$/.test(e[0])&&(e[0]=e[0]+"0"),e.length>1&&(e[1]=e[1].replace(/0*$/,""),e[1].length||(e.length=1)),this._insertThousandsSeparators(e.join(this.radix))}_padFractionalZeros(t){if(!t)return t;var e=t.split(this.radix);return e.length<2&&e.push(""),e[1]=e[1].padEnd(this.scale,"0"),e.join(this.radix)}get unmaskedValue(){return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix,".")}set unmaskedValue(t){super.unmaskedValue=t.replace(".",this.radix)}get number(){return Number(this.unmaskedValue)}set number(t){this.unmaskedValue=String(t)}get typedValue(){return this.number}set typedValue(t){this.number=t}get allowNegative(){return this.signed||null!=this.min&&this.min<0||null!=this.max&&this.max<0}}D.DEFAULTS={radix:",",thousandsSeparator:"",mapToRadix:["."],scale:2,signed:!1,normalizeZeros:!0,padFractionalZeros:!1};class B extends d{_update(t){t.mask&&(t.validate=e=>e.search(t.mask)>=0),super._update(t)}}class S extends d{_update(t){t.mask&&(t.validate=t.mask),super._update(t)}}class x extends d{constructor(t){super(i({},x.DEFAULTS,{},t)),this.currentMask=null}_update(t){super._update(t),"mask"in t&&(this.compiledMasks=Array.isArray(t.mask)?t.mask.map(t=>c(t)):[])}_appendCharRaw(){var t=this._applyDispatch(...arguments);return this.currentMask&&t.aggregate(this.currentMask._appendChar(...arguments)),t}_applyDispatch(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=e.tail&&null!=e._beforeTailState?e._beforeTailState._value:this.value,r=this.rawInputValue,a=e.tail&&null!=e._beforeTailState?e._beforeTailState._rawInputValue:r,u=r.slice(a.length),n=this.currentMask,h=new l,o=n&&n.state;if(this.currentMask=this.doDispatch(t,i({},e)),this.currentMask)if(this.currentMask!==n){this.currentMask.reset();var d=this.currentMask.append(a,{raw:!0});h.tailShift=d.inserted.length-s.length,u&&(h.tailShift+=this.currentMask.append(u,{raw:!0,tail:!0}).tailShift)}else this.currentMask.state=o;return h}_appendPlaceholder(){var t=this._applyDispatch(...arguments);return this.currentMask&&t.aggregate(this.currentMask._appendPlaceholder()),t}doDispatch(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.dispatch(t,this,e)}doValidate(){return super.doValidate(...arguments)&&(!this.currentMask||this.currentMask.doValidate(...arguments))}reset(){this.currentMask&&this.currentMask.reset(),this.compiledMasks.forEach(t=>t.reset())}get value(){return this.currentMask?this.currentMask.value:""}set value(t){super.value=t}get unmaskedValue(){return this.currentMask?this.currentMask.unmaskedValue:""}set unmaskedValue(t){super.unmaskedValue=t}get typedValue(){return this.currentMask?this.currentMask.typedValue:""}set typedValue(t){var e=String(t);this.currentMask&&(this.currentMask.typedValue=t,e=this.currentMask.unmaskedValue),this.unmaskedValue=e}get isComplete(){return!!this.currentMask&&this.currentMask.isComplete}remove(){var t=new l;return this.currentMask&&t.aggregate(this.currentMask.remove(...arguments)).aggregate(this._applyDispatch()),t}get state(){return i({},super.state,{_rawInputValue:this.rawInputValue,compiledMasks:this.compiledMasks.map(t=>t.state),currentMaskRef:this.currentMask,currentMask:this.currentMask&&this.currentMask.state})}set state(t){var{compiledMasks:e,currentMaskRef:s,currentMask:r}=t,a=n(t,["compiledMasks","currentMaskRef","currentMask"]);this.compiledMasks.forEach((t,s)=>t.state=e[s]),null!=s&&(this.currentMask=s,this.currentMask.state=r),super.state=a}extractInput(){return this.currentMask?this.currentMask.extractInput(...arguments):""}extractTail(){return this.currentMask?this.currentMask.extractTail(...arguments):super.extractTail(...arguments)}doCommit(){this.currentMask&&this.currentMask.doCommit(),super.doCommit()}nearestInputPos(){return this.currentMask?this.currentMask.nearestInputPos(...arguments):super.nearestInputPos(...arguments)}get overwrite(){return this.currentMask?this.currentMask.overwrite:super.overwrite}set overwrite(t){console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings')}}function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new E(t,e)}x.DEFAULTS={dispatch:(t,e,s)=>{if(e.compiledMasks.length){var r=e.rawInputValue,a=e.compiledMasks.map((e,a)=>{return e.reset(),e.append(r,{raw:!0}),e.append(t,s),{weight:e.rawInputValue.length,index:a}});return a.sort((t,e)=>e.weight-t.weight),e.compiledMasks[a[0].index]}}},w.InputMask=E,w.Masked=d,w.MaskedPattern=_,w.MaskedEnum=b,w.MaskedRange=f,w.MaskedNumber=D,w.MaskedDate=A,w.MaskedRegExp=B,w.MaskedFunction=S,w.MaskedDynamic=x,w.createMask=c,w.MaskElement=C,w.HTMLMaskElement=F,r.IMask=w;export default w;export{F as HTMLMaskElement,E as InputMask,C as MaskElement,d as Masked,A as MaskedDate,x as MaskedDynamic,b as MaskedEnum,S as MaskedFunction,D as MaskedNumber,_ as MaskedPattern,f as MaskedRange,B as MaskedRegExp,c as createMask};
//# sourceMappingURL=imask.es.min.js.map

/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
(function(window) {
    /*jshint eqnull:true */
    var ua = navigator.userAgent;

    if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) ) {
        addEventListener("resize", (function() {
            var timer;

            var dummySrc = document.createElement("source");

            var fixRespimg = function(img) {
                var source, sizes;
                var picture = img.parentNode;

                if (picture.nodeName.toUpperCase() === "PICTURE") {
                    source = dummySrc.cloneNode();

                    picture.insertBefore(source, picture.firstElementChild);
                    setTimeout(function() {
                        picture.removeChild(source);
                    });
                } else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
                    img._pfLastSize = img.offsetWidth;
                    sizes = img.sizes;
                    img.sizes += ",100vw";
                    setTimeout(function() {
                        img.sizes = sizes;
                    });
                }
            };

            var findPictureImgs = function() {
                var i;
                var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
                for (i = 0; i < imgs.length; i++) {
                    fixRespimg(imgs[i]);
                }
            };
            var onResize = function() {
                clearTimeout(timer);
                timer = setTimeout(findPictureImgs, 99);
            };
            var mq = window.matchMedia && matchMedia("(orientation: landscape)");
            var init = function() {
                onResize();

                if (mq && mq.addListener) {
                    mq.addListener(onResize);
                }
            };

            dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

            if (/^[c|i]|d$/.test(document.readyState || "")) {
                init();
            } else {
                document.addEventListener("DOMContentLoaded", init);
            }

            return onResize;
        })());
    }
})(window);

/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */

(function( window, document, undefined ) {
    // Enable strict mode
    "use strict";

    // HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
    document.createElement( "picture" );

    var warn, eminpx, alwaysCheckWDescriptor, evalId;
    // local object for method references and testing exposure
    var pf = {};
    var isSupportTestReady = false;
    var noop = function() {};
    var image = document.createElement( "img" );
    var getImgAttr = image.getAttribute;
    var setImgAttr = image.setAttribute;
    var removeImgAttr = image.removeAttribute;
    var docElem = document.documentElement;
    var types = {};
    var cfg = {
        //resource selection:
        algorithm: ""
    };
    var srcAttr = "data-pfsrc";
    var srcsetAttr = srcAttr + "set";
    // ua sniffing is done for undetectable img loading features,
    // to do some non crucial perf optimizations
    var ua = navigator.userAgent;
    var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
    var curSrcProp = "currentSrc";
    var regWDesc = /\s+\+?\d+(e\d+)?w/;
    var regSize = /(\([^)]+\))?\s*(.+)/;
    var setOptions = window.picturefillCFG;
    /**
     * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
     */
    // baseStyle also used by getEmValue (i.e.: width: 1em is important)
    var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
    var fsCss = "font-size:100%!important;";
    var isVwDirty = true;

    var cssCache = {};
    var sizeLengthCache = {};
    var DPR = window.devicePixelRatio;
    var units = {
        px: 1,
        "in": 96
    };
    var anchor = document.createElement( "a" );
    /**
     * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
     * @type {boolean}
     */
    var alreadyRun = false;

    // Reusable, non-"g" Regexes

    // (Don't use \s, to avoid matching non-breaking space.)
    var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
        regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
        regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
        regexTrailingCommas = /[,]+$/,
        regexNonNegativeInteger = /^\d+$/,

        // ( Positive or negative or unsigned integers or decimals, without or without exponents.
        // Must include at least one digit.
        // According to spec tests any decimal point must be followed by a digit.
        // No leading plus sign is allowed.)
        // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
        regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

    var on = function(obj, evt, fn, capture) {
        if ( obj.addEventListener ) {
            obj.addEventListener(evt, fn, capture || false);
        } else if ( obj.attachEvent ) {
            obj.attachEvent( "on" + evt, fn);
        }
    };

    /**
     * simple memoize function:
     */

    var memoize = function(fn) {
        var cache = {};
        return function(input) {
            if ( !(input in cache) ) {
                cache[ input ] = fn(input);
            }
            return cache[ input ];
        };
    };

    // UTILITY FUNCTIONS

    // Manual is faster than RegEx
    // http://jsperf.com/whitespace-character/5
    function isSpace(c) {
        return (c === "\u0020" || // space
                c === "\u0009" || // horizontal tab
                c === "\u000A" || // new line
                c === "\u000C" || // form feed
                c === "\u000D");  // carriage return
    }

    /**
     * gets a mediaquery and returns a boolean or gets a css length and returns a number
     * @param css mediaqueries or css length
     * @returns {boolean|number}
     *
     * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
     */
    var evalCSS = (function() {

        var regLength = /^([\d\.]+)(em|vw|px)$/;
        var replace = function() {
            var args = arguments, index = 0, string = args[0];
            while (++index in args) {
                string = string.replace(args[index], args[++index]);
            }
            return string;
        };

        var buildStr = memoize(function(css) {

            return "return " + replace((css || "").toLowerCase(),
                // interpret `and`
                /\band\b/g, "&&",

                // interpret `,`
                /,/g, "||",

                // interpret `min-` as >=
                /min-([a-z-\s]+):/g, "e.$1>=",

                // interpret `max-` as <=
                /max-([a-z-\s]+):/g, "e.$1<=",

                //calc value
                /calc([^)]+)/g, "($1)",

                // interpret css values
                /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
                //make eval less evil
                /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
            ) + ";";
        });

        return function(css, length) {
            var parsedLength;
            if (!(css in cssCache)) {
                cssCache[css] = false;
                if (length && (parsedLength = css.match( regLength ))) {
                    cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
                } else {
                    /*jshint evil:true */
                    try{
                        cssCache[css] = new Function("e", buildStr(css))(units);
                    } catch(e) {}
                    /*jshint evil:false */
                }
            }
            return cssCache[css];
        };
    })();

    var setResolution = function( candidate, sizesattr ) {
        if ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...
            candidate.cWidth = pf.calcListLength( sizesattr || "100vw" );
            candidate.res = candidate.w / candidate.cWidth ;
        } else {
            candidate.res = candidate.d;
        }
        return candidate;
    };

    /**
     *
     * @param opt
     */
    var picturefill = function( opt ) {

        if (!isSupportTestReady) {return;}

        var elements, i, plen;

        var options = opt || {};

        if ( options.elements && options.elements.nodeType === 1 ) {
            if ( options.elements.nodeName.toUpperCase() === "IMG" ) {
                options.elements =  [ options.elements ];
            } else {
                options.context = options.elements;
                options.elements =  null;
            }
        }

        elements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );

        if ( (plen = elements.length) ) {

            pf.setupRun( options );
            alreadyRun = true;

            // Loop through all elements
            for ( i = 0; i < plen; i++ ) {
                pf.fillImg(elements[ i ], options);
            }

            pf.teardownRun( options );
        }
    };

    /**
     * outputs a warning for the developer
     * @param {message}
     * @type {Function}
     */
    warn = ( window.console && console.warn ) ?
        function( message ) {
            console.warn( message );
        } :
        noop
    ;

    if ( !(curSrcProp in image) ) {
        curSrcProp = "src";
    }

    // Add support for standard mime types.
    types[ "image/jpeg" ] = true;
    types[ "image/gif" ] = true;
    types[ "image/png" ] = true;

    function detectTypeSupport( type, typeUri ) {
        // based on Modernizr's lossless img-webp test
        // note: asynchronous
        var image = new window.Image();
        image.onerror = function() {
            types[ type ] = false;
            picturefill();
        };
        image.onload = function() {
            types[ type ] = image.width === 1;
            picturefill();
        };
        image.src = typeUri;
        return "pending";
    }

    // test svg support
    types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );

    /**
     * updates the internal vW property with the current viewport width in px
     */
    function updateMetrics() {

        isVwDirty = false;
        DPR = window.devicePixelRatio;
        cssCache = {};
        sizeLengthCache = {};

        pf.DPR = DPR || 1;

        units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
        units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

        units.vw = units.width / 100;
        units.vh = units.height / 100;

        evalId = [ units.height, units.width, DPR ].join("-");

        units.em = pf.getEmValue();
        units.rem = units.em;
    }

    function chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {
        var bonusFactor, tooMuch, bonus, meanDensity;

        //experimental
        if (cfg.algorithm === "saveData" ){
            if ( lowerValue > 2.7 ) {
                meanDensity = dprValue + 1;
            } else {
                tooMuch = higherValue - dprValue;
                bonusFactor = Math.pow(lowerValue - 0.6, 1.5);

                bonus = tooMuch * bonusFactor;

                if (isCached) {
                    bonus += 0.1 * bonusFactor;
                }

                meanDensity = lowerValue + bonus;
            }
        } else {
            meanDensity = (dprValue > 1) ?
                Math.sqrt(lowerValue * higherValue) :
                lowerValue;
        }

        return meanDensity > dprValue;
    }

    function applyBestCandidate( img ) {
        var srcSetCandidates;
        var matchingSet = pf.getSet( img );
        var evaluated = false;
        if ( matchingSet !== "pending" ) {
            evaluated = evalId;
            if ( matchingSet ) {
                srcSetCandidates = pf.setRes( matchingSet );
                pf.applySetCandidate( srcSetCandidates, img );
            }
        }
        img[ pf.ns ].evaled = evaluated;
    }

    function ascendingSort( a, b ) {
        return a.res - b.res;
    }

    function setSrcToCur( img, src, set ) {
        var candidate;
        if ( !set && src ) {
            set = img[ pf.ns ].sets;
            set = set && set[set.length - 1];
        }

        candidate = getCandidateForSrc(src, set);

        if ( candidate ) {
            src = pf.makeUrl(src);
            img[ pf.ns ].curSrc = src;
            img[ pf.ns ].curCan = candidate;

            if ( !candidate.res ) {
                setResolution( candidate, candidate.set.sizes );
            }
        }
        return candidate;
    }

    function getCandidateForSrc( src, set ) {
        var i, candidate, candidates;
        if ( src && set ) {
            candidates = pf.parseSet( set );
            src = pf.makeUrl(src);
            for ( i = 0; i < candidates.length; i++ ) {
                if ( src === pf.makeUrl(candidates[ i ].url) ) {
                    candidate = candidates[ i ];
                    break;
                }
            }
        }
        return candidate;
    }

    function getAllSourceElements( picture, candidates ) {
        var i, len, source, srcset;

        // SPEC mismatch intended for size and perf:
        // actually only source elements preceding the img should be used
        // also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
        var sources = picture.getElementsByTagName( "source" );

        for ( i = 0, len = sources.length; i < len; i++ ) {
            source = sources[ i ];
            source[ pf.ns ] = true;
            srcset = source.getAttribute( "srcset" );

            // if source does not have a srcset attribute, skip
            if ( srcset ) {
                candidates.push( {
                    srcset: srcset,
                    media: source.getAttribute( "media" ),
                    type: source.getAttribute( "type" ),
                    sizes: source.getAttribute( "sizes" )
                } );
            }
        }
    }

    /**
     * Srcset Parser
     * By Alex Bell |  MIT License
     *
     * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
     *
     * Based super duper closely on the reference algorithm at:
     * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
     */

    // 1. Let input be the value passed to this algorithm.
    // (TO-DO : Explain what "set" argument is here. Maybe choose a more
    // descriptive & more searchable name.  Since passing the "set" in really has
    // nothing to do with parsing proper, I would prefer this assignment eventually
    // go in an external fn.)
    function parseSrcset(input, set) {

        function collectCharacters(regEx) {
            var chars,
                match = regEx.exec(input.substring(pos));
            if (match) {
                chars = match[ 0 ];
                pos += chars.length;
                return chars;
            }
        }

        var inputLength = input.length,
            url,
            descriptors,
            currentDescriptor,
            state,
            c,

            // 2. Let position be a pointer into input, initially pointing at the start
            //    of the string.
            pos = 0,

            // 3. Let candidates be an initially empty source set.
            candidates = [];

        /**
        * Adds descriptor properties to a candidate, pushes to the candidates array
        * @return undefined
        */
        // (Declared outside of the while loop so that it's only created once.
        // (This fn is defined before it is used, in order to pass JSHINT.
        // Unfortunately this breaks the sequencing of the spec comments. :/ )
        function parseDescriptors() {

            // 9. Descriptor parser: Let error be no.
            var pError = false,

            // 10. Let width be absent.
            // 11. Let density be absent.
            // 12. Let future-compat-h be absent. (We're implementing it now as h)
                w, d, h, i,
                candidate = {},
                desc, lastChar, value, intVal, floatVal;

            // 13. For each descriptor in descriptors, run the appropriate set of steps
            // from the following list:
            for (i = 0 ; i < descriptors.length; i++) {
                desc = descriptors[ i ];

                lastChar = desc[ desc.length - 1 ];
                value = desc.substring(0, desc.length - 1);
                intVal = parseInt(value, 10);
                floatVal = parseFloat(value);

                // If the descriptor consists of a valid non-negative integer followed by
                // a U+0077 LATIN SMALL LETTER W character
                if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

                    // If width and density are not both absent, then let error be yes.
                    if (w || d) {pError = true;}

                    // Apply the rules for parsing non-negative integers to the descriptor.
                    // If the result is zero, let error be yes.
                    // Otherwise, let width be the result.
                    if (intVal === 0) {pError = true;} else {w = intVal;}

                // If the descriptor consists of a valid floating-point number followed by
                // a U+0078 LATIN SMALL LETTER X character
                } else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

                    // If width, density and future-compat-h are not all absent, then let error
                    // be yes.
                    if (w || d || h) {pError = true;}

                    // Apply the rules for parsing floating-point number values to the descriptor.
                    // If the result is less than zero, let error be yes. Otherwise, let density
                    // be the result.
                    if (floatVal < 0) {pError = true;} else {d = floatVal;}

                // If the descriptor consists of a valid non-negative integer followed by
                // a U+0068 LATIN SMALL LETTER H character
                } else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

                    // If height and density are not both absent, then let error be yes.
                    if (h || d) {pError = true;}

                    // Apply the rules for parsing non-negative integers to the descriptor.
                    // If the result is zero, let error be yes. Otherwise, let future-compat-h
                    // be the result.
                    if (intVal === 0) {pError = true;} else {h = intVal;}

                // Anything else, Let error be yes.
                } else {pError = true;}
            } // (close step 13 for loop)

            // 15. If error is still no, then append a new image source to candidates whose
            // URL is url, associated with a width width if not absent and a pixel
            // density density if not absent. Otherwise, there is a parse error.
            if (!pError) {
                candidate.url = url;

                if (w) { candidate.w = w;}
                if (d) { candidate.d = d;}
                if (h) { candidate.h = h;}
                if (!h && !d && !w) {candidate.d = 1;}
                if (candidate.d === 1) {set.has1x = true;}
                candidate.set = set;

                candidates.push(candidate);
            }
        } // (close parseDescriptors fn)

        /**
        * Tokenizes descriptor properties prior to parsing
        * Returns undefined.
        * (Again, this fn is defined before it is used, in order to pass JSHINT.
        * Unfortunately this breaks the logical sequencing of the spec comments. :/ )
        */
        function tokenize() {

            // 8.1. Descriptor tokeniser: Skip whitespace
            collectCharacters(regexLeadingSpaces);

            // 8.2. Let current descriptor be the empty string.
            currentDescriptor = "";

            // 8.3. Let state be in descriptor.
            state = "in descriptor";

            while (true) {

                // 8.4. Let c be the character at position.
                c = input.charAt(pos);

                //  Do the following depending on the value of state.
                //  For the purpose of this step, "EOF" is a special character representing
                //  that position is past the end of input.

                // In descriptor
                if (state === "in descriptor") {
                    // Do the following, depending on the value of c:

                  // Space character
                  // If current descriptor is not empty, append current descriptor to
                  // descriptors and let current descriptor be the empty string.
                  // Set state to after descriptor.
                    if (isSpace(c)) {
                        if (currentDescriptor) {
                            descriptors.push(currentDescriptor);
                            currentDescriptor = "";
                            state = "after descriptor";
                        }

                    // U+002C COMMA (,)
                    // Advance position to the next character in input. If current descriptor
                    // is not empty, append current descriptor to descriptors. Jump to the step
                    // labeled descriptor parser.
                    } else if (c === ",") {
                        pos += 1;
                        if (currentDescriptor) {
                            descriptors.push(currentDescriptor);
                        }
                        parseDescriptors();
                        return;

                    // U+0028 LEFT PARENTHESIS (()
                    // Append c to current descriptor. Set state to in parens.
                    } else if (c === "\u0028") {
                        currentDescriptor = currentDescriptor + c;
                        state = "in parens";

                    // EOF
                    // If current descriptor is not empty, append current descriptor to
                    // descriptors. Jump to the step labeled descriptor parser.
                    } else if (c === "") {
                        if (currentDescriptor) {
                            descriptors.push(currentDescriptor);
                        }
                        parseDescriptors();
                        return;

                    // Anything else
                    // Append c to current descriptor.
                    } else {
                        currentDescriptor = currentDescriptor + c;
                    }
                // (end "in descriptor"

                // In parens
                } else if (state === "in parens") {

                    // U+0029 RIGHT PARENTHESIS ())
                    // Append c to current descriptor. Set state to in descriptor.
                    if (c === ")") {
                        currentDescriptor = currentDescriptor + c;
                        state = "in descriptor";

                    // EOF
                    // Append current descriptor to descriptors. Jump to the step labeled
                    // descriptor parser.
                    } else if (c === "") {
                        descriptors.push(currentDescriptor);
                        parseDescriptors();
                        return;

                    // Anything else
                    // Append c to current descriptor.
                    } else {
                        currentDescriptor = currentDescriptor + c;
                    }

                // After descriptor
                } else if (state === "after descriptor") {

                    // Do the following, depending on the value of c:
                    // Space character: Stay in this state.
                    if (isSpace(c)) {

                    // EOF: Jump to the step labeled descriptor parser.
                    } else if (c === "") {
                        parseDescriptors();
                        return;

                    // Anything else
                    // Set state to in descriptor. Set position to the previous character in input.
                    } else {
                        state = "in descriptor";
                        pos -= 1;

                    }
                }

                // Advance position to the next character in input.
                pos += 1;

            // Repeat this step.
            } // (close while true loop)
        }

        // 4. Splitting loop: Collect a sequence of characters that are space
        //    characters or U+002C COMMA characters. If any U+002C COMMA characters
        //    were collected, that is a parse error.
        while (true) {
            collectCharacters(regexLeadingCommasOrSpaces);

            // 5. If position is past the end of input, return candidates and abort these steps.
            if (pos >= inputLength) {
                return candidates; // (we're done, this is the sole return path)
            }

            // 6. Collect a sequence of characters that are not space characters,
            //    and let that be url.
            url = collectCharacters(regexLeadingNotSpaces);

            // 7. Let descriptors be a new empty list.
            descriptors = [];

            // 8. If url ends with a U+002C COMMA character (,), follow these substeps:
            //      (1). Remove all trailing U+002C COMMA characters from url. If this removed
            //         more than one character, that is a parse error.
            if (url.slice(-1) === ",") {
                url = url.replace(regexTrailingCommas, "");
                // (Jump ahead to step 9 to skip tokenization and just push the candidate).
                parseDescriptors();

            //  Otherwise, follow these substeps:
            } else {
                tokenize();
            } // (close else of step 8)

        // 16. Return to the step labeled splitting loop.
        } // (Close of big while loop.)
    }

    /*
     * Sizes Parser
     *
     * By Alex Bell |  MIT License
     *
     * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
     *
     * Reference algorithm at:
     * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
     *
     * Most comments are copied in directly from the spec
     * (except for comments in parens).
     *
     * Grammar is:
     * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
     * <source-size> = <media-condition> <source-size-value>
     * <source-size-value> = <length>
     * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
     *
     * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
     * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
     *
     * Returns the first valid <css-length> with a media condition that evaluates to true,
     * or "100vw" if all valid media conditions evaluate to false.
     *
     */

    function parseSizes(strValue) {

        // (Percentage CSS lengths are not allowed in this case, to avoid confusion:
        // https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
        // CSS allows a single optional plus or minus sign:
        // http://www.w3.org/TR/CSS2/syndata.html#numbers
        // CSS is ASCII case-insensitive:
        // http://www.w3.org/TR/CSS2/syndata.html#characters )
        // Spec allows exponential notation for <number> type:
        // http://dev.w3.org/csswg/css-values/#numbers
        var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;

        // (This is a quick and lenient test. Because of optional unlimited-depth internal
        // grouping parens and strict spacing rules, this could get very complicated.)
        var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;

        var i;
        var unparsedSizesList;
        var unparsedSizesListLength;
        var unparsedSize;
        var lastComponentValue;
        var size;

        // UTILITY FUNCTIONS

        //  (Toy CSS parser. The goals here are:
        //  1) expansive test coverage without the weight of a full CSS parser.
        //  2) Avoiding regex wherever convenient.
        //  Quick tests: http://jsfiddle.net/gtntL4gr/3/
        //  Returns an array of arrays.)
        function parseComponentValues(str) {
            var chrctr;
            var component = "";
            var componentArray = [];
            var listArray = [];
            var parenDepth = 0;
            var pos = 0;
            var inComment = false;

            function pushComponent() {
                if (component) {
                    componentArray.push(component);
                    component = "";
                }
            }

            function pushComponentArray() {
                if (componentArray[0]) {
                    listArray.push(componentArray);
                    componentArray = [];
                }
            }

            // (Loop forwards from the beginning of the string.)
            while (true) {
                chrctr = str.charAt(pos);

                if (chrctr === "") { // ( End of string reached.)
                    pushComponent();
                    pushComponentArray();
                    return listArray;
                } else if (inComment) {
                    if ((chrctr === "*") && (str[pos + 1] === "/")) { // (At end of a comment.)
                        inComment = false;
                        pos += 2;
                        pushComponent();
                        continue;
                    } else {
                        pos += 1; // (Skip all characters inside comments.)
                        continue;
                    }
                } else if (isSpace(chrctr)) {
                    // (If previous character in loop was also a space, or if
                    // at the beginning of the string, do not add space char to
                    // component.)
                    if ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {
                        pos += 1;
                        continue;
                    } else if (parenDepth === 0) {
                        pushComponent();
                        pos +=1;
                        continue;
                    } else {
                        // (Replace any space character with a plain space for legibility.)
                        chrctr = " ";
                    }
                } else if (chrctr === "(") {
                    parenDepth += 1;
                } else if (chrctr === ")") {
                    parenDepth -= 1;
                } else if (chrctr === ",") {
                    pushComponent();
                    pushComponentArray();
                    pos += 1;
                    continue;
                } else if ( (chrctr === "/") && (str.charAt(pos + 1) === "*") ) {
                    inComment = true;
                    pos += 2;
                    continue;
                }

                component = component + chrctr;
                pos += 1;
            }
        }

        function isValidNonNegativeSourceSizeValue(s) {
            if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}
            if (regexCssCalc.test(s)) {return true;}
            // ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
            // "-0 is equivalent to 0 and is not a negative number." which means that
            // unitless zero and unitless negative zero must be accepted as special cases.)
            if ((s === "0") || (s === "-0") || (s === "+0")) {return true;}
            return false;
        }

        // When asked to parse a sizes attribute from an element, parse a
        // comma-separated list of component values from the value of the element's
        // sizes attribute (or the empty string, if the attribute is absent), and let
        // unparsed sizes list be the result.
        // http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values

        unparsedSizesList = parseComponentValues(strValue);
        unparsedSizesListLength = unparsedSizesList.length;

        // For each unparsed size in unparsed sizes list:
        for (i = 0; i < unparsedSizesListLength; i++) {
            unparsedSize = unparsedSizesList[i];

            // 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
            // ( parseComponentValues() already omits spaces outside of parens. )

            // If unparsed size is now empty, that is a parse error; continue to the next
            // iteration of this algorithm.
            // ( parseComponentValues() won't push an empty array. )

            // 2. If the last component value in unparsed size is a valid non-negative
            // <source-size-value>, let size be its value and remove the component value
            // from unparsed size. Any CSS function other than the calc() function is
            // invalid. Otherwise, there is a parse error; continue to the next iteration
            // of this algorithm.
            // http://dev.w3.org/csswg/css-syntax/#parse-component-value
            lastComponentValue = unparsedSize[unparsedSize.length - 1];

            if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
                size = lastComponentValue;
                unparsedSize.pop();
            } else {
                continue;
            }

            // 3. Remove all consecutive <whitespace-token>s from the end of unparsed
            // size. If unparsed size is now empty, return size and exit this algorithm.
            // If this was not the last item in unparsed sizes list, that is a parse error.
            if (unparsedSize.length === 0) {
                return size;
            }

            // 4. Parse the remaining component values in unparsed size as a
            // <media-condition>. If it does not parse correctly, or it does parse
            // correctly but the <media-condition> evaluates to false, continue to the
            // next iteration of this algorithm.
            // (Parsing all possible compound media conditions in JS is heavy, complicated,
            // and the payoff is unclear. Is there ever an situation where the
            // media condition parses incorrectly but still somehow evaluates to true?
            // Can we just rely on the browser/polyfill to do it?)
            unparsedSize = unparsedSize.join(" ");
            if (!(pf.matchesMedia( unparsedSize ) ) ) {
                continue;
            }

            // 5. Return size and exit this algorithm.
            return size;
        }

        // If the above algorithm exhausts unparsed sizes list without returning a
        // size value, return 100vw.
        return "100vw";
    }

    // namespace
    pf.ns = ("pf" + new Date().getTime()).substr(0, 9);

    // srcset support test
    pf.supSrcset = "srcset" in image;
    pf.supSizes = "sizes" in image;
    pf.supPicture = !!window.HTMLPictureElement;

    // UC browser does claim to support srcset and picture, but not sizes,
    // this extended test reveals the browser does support nothing
    if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
        (function(image2) {
            image.srcset = "data:,a";
            image2.src = "data:,a";
            pf.supSrcset = image.complete === image2.complete;
            pf.supPicture = pf.supSrcset && pf.supPicture;
        })(document.createElement("img"));
    }

    // Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute
    if (pf.supSrcset && !pf.supSizes) {

        (function() {
            var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
            var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            var img = document.createElement("img");
            var test = function() {
                var width = img.width;

                if (width === 2) {
                    pf.supSizes = true;
                }

                alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;

                isSupportTestReady = true;
                // force async
                setTimeout(picturefill);
            };

            img.onload = test;
            img.onerror = test;
            img.setAttribute("sizes", "9px");

            img.srcset = width1 + " 1w," + width2 + " 9w";
            img.src = width1;
        })();

    } else {
        isSupportTestReady = true;
    }

    // using pf.qsa instead of dom traversing does scale much better,
    // especially on sites mixing responsive and non-responsive images
    pf.selShort = "picture>img,img[srcset]";
    pf.sel = pf.selShort;
    pf.cfg = cfg;

    /**
     * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
     */
    pf.DPR = (DPR  || 1 );
    pf.u = units;

    // container of supported mime types that one might need to qualify before using
    pf.types =  types;

    pf.setSize = noop;

    /**
     * Gets a string and returns the absolute URL
     * @param src
     * @returns {String} absolute URL
     */

    pf.makeUrl = memoize(function(src) {
        anchor.href = src;
        return anchor.href;
    });

    /**
     * Gets a DOM element or document and a selctor and returns the found matches
     * Can be extended with jQuery/Sizzle for IE7 support
     * @param context
     * @param sel
     * @returns {NodeList|Array}
     */
    pf.qsa = function(context, sel) {
        return ( "querySelector" in context ) ? context.querySelectorAll(sel) : [];
    };

    /**
     * Shortcut method for matchMedia ( for easy overriding in tests )
     * wether native or pf.mMQ is used will be decided lazy on first call
     * @returns {boolean}
     */
    pf.matchesMedia = function() {
        if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
            pf.matchesMedia = function( media ) {
                return !media || ( matchMedia( media ).matches );
            };
        } else {
            pf.matchesMedia = pf.mMQ;
        }

        return pf.matchesMedia.apply( this, arguments );
    };

    /**
     * A simplified matchMedia implementation for IE8 and IE9
     * handles only min-width/max-width with px or em values
     * @param media
     * @returns {boolean}
     */
    pf.mMQ = function( media ) {
        return media ? evalCSS(media) : true;
    };

    /**
     * Returns the calculated length in css pixel from the given sourceSizeValue
     * http://dev.w3.org/csswg/css-values-3/#length-value
     * intended Spec mismatches:
     * * Does not check for invalid use of CSS functions
     * * Does handle a computed length of 0 the same as a negative and therefore invalid value
     * @param sourceSizeValue
     * @returns {Number}
     */
    pf.calcLength = function( sourceSizeValue ) {

        var value = evalCSS(sourceSizeValue, true) || false;
        if (value < 0) {
            value = false;
        }

        return value;
    };

    /**
     * Takes a type string and checks if its supported
     */

    pf.supportsType = function( type ) {
        return ( type ) ? types[ type ] : true;
    };

    /**
     * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
     * @param sourceSizeStr
     * @returns {*}
     */
    pf.parseSize = memoize(function( sourceSizeStr ) {
        var match = ( sourceSizeStr || "" ).match(regSize);
        return {
            media: match && match[1],
            length: match && match[2]
        };
    });

    pf.parseSet = function( set ) {
        if ( !set.cands ) {
            set.cands = parseSrcset(set.srcset, set);
        }
        return set.cands;
    };

    /**
     * returns 1em in css px for html/body default size
     * function taken from respondjs
     * @returns {*|number}
     */
    pf.getEmValue = function() {
        var body;
        if ( !eminpx && (body = document.body) ) {
            var div = document.createElement( "div" ),
                originalHTMLCSS = docElem.style.cssText,
                originalBodyCSS = body.style.cssText;

            div.style.cssText = baseStyle;

            // 1em in a media query is the value of the default font size of the browser
            // reset docElem and body to ensure the correct value is returned
            docElem.style.cssText = fsCss;
            body.style.cssText = fsCss;

            body.appendChild( div );
            eminpx = div.offsetWidth;
            body.removeChild( div );

            //also update eminpx before returning
            eminpx = parseFloat( eminpx, 10 );

            // restore the original values
            docElem.style.cssText = originalHTMLCSS;
            body.style.cssText = originalBodyCSS;

        }
        return eminpx || 16;
    };

    /**
     * Takes a string of sizes and returns the width in pixels as a number
     */
    pf.calcListLength = function( sourceSizeListStr ) {
        // Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
        //
        //                           or (min-width:30em) calc(30% - 15px)
        if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
            var winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );

            sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
        }

        return sizeLengthCache[ sourceSizeListStr ];
    };

    /**
     * Takes a candidate object with a srcset property in the form of url/
     * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
     *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
     *     "images/pic-small.png"
     * Get an array of image candidates in the form of
     *      {url: "/foo/bar.png", resolution: 1}
     * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
     * If sizes is specified, res is calculated
     */
    pf.setRes = function( set ) {
        var candidates;
        if ( set ) {

            candidates = pf.parseSet( set );

            for ( var i = 0, len = candidates.length; i < len; i++ ) {
                setResolution( candidates[ i ], set.sizes );
            }
        }
        return candidates;
    };

    pf.setRes.res = setResolution;

    pf.applySetCandidate = function( candidates, img ) {
        if ( !candidates.length ) {return;}
        var candidate,
            i,
            j,
            length,
            bestCandidate,
            curSrc,
            curCan,
            candidateSrc,
            abortCurSrc;

        var imageData = img[ pf.ns ];
        var dpr = pf.DPR;

        curSrc = imageData.curSrc || img[curSrcProp];

        curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

        // if we have a current source, we might either become lazy or give this source some advantage
        if ( curCan && curCan.set === candidates[ 0 ].set ) {

            // if browser can abort image request and the image has a higher pixel density than needed
            // and this image isn't downloaded yet, we skip next part and try to save bandwidth
            abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);

            if ( !abortCurSrc ) {
                curCan.cached = true;

                // if current candidate is "best", "better" or "okay",
                // set it to bestCandidate
                if ( curCan.res >= dpr ) {
                    bestCandidate = curCan;
                }
            }
        }

        if ( !bestCandidate ) {

            candidates.sort( ascendingSort );

            length = candidates.length;
            bestCandidate = candidates[ length - 1 ];

            for ( i = 0; i < length; i++ ) {
                candidate = candidates[ i ];
                if ( candidate.res >= dpr ) {
                    j = i - 1;

                    // we have found the perfect candidate,
                    // but let's improve this a little bit with some assumptions ;-)
                    if (candidates[ j ] &&
                        (abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&
                        chooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {

                        bestCandidate = candidates[ j ];

                    } else {
                        bestCandidate = candidate;
                    }
                    break;
                }
            }
        }

        if ( bestCandidate ) {

            candidateSrc = pf.makeUrl( bestCandidate.url );

            imageData.curSrc = candidateSrc;
            imageData.curCan = bestCandidate;

            if ( candidateSrc !== curSrc ) {
                pf.setSrc( img, bestCandidate );
            }
            pf.setSize( img );
        }
    };

    pf.setSrc = function( img, bestCandidate ) {
        var origWidth;
        img.src = bestCandidate.url;

        // although this is a specific Safari issue, we don't want to take too much different code paths
        if ( bestCandidate.set.type === "image/svg+xml" ) {
            origWidth = img.style.width;
            img.style.width = (img.offsetWidth + 1) + "px";

            // next line only should trigger a repaint
            // if... is only done to trick dead code removal
            if ( img.offsetWidth + 1 ) {
                img.style.width = origWidth;
            }
        }
    };

    pf.getSet = function( img ) {
        var i, set, supportsType;
        var match = false;
        var sets = img [ pf.ns ].sets;

        for ( i = 0; i < sets.length && !match; i++ ) {
            set = sets[i];

            if ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {
                continue;
            }

            if ( supportsType === "pending" ) {
                set = supportsType;
            }

            match = set;
            break;
        }

        return match;
    };

    pf.parseSets = function( element, parent, options ) {
        var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

        var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
        var imageData = element[ pf.ns ];

        if ( imageData.src === undefined || options.src ) {
            imageData.src = getImgAttr.call( element, "src" );
            if ( imageData.src ) {
                setImgAttr.call( element, srcAttr, imageData.src );
            } else {
                removeImgAttr.call( element, srcAttr );
            }
        }

        if ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {
            srcsetAttribute = getImgAttr.call( element, "srcset" );
            imageData.srcset = srcsetAttribute;
            srcsetParsed = true;
        }

        imageData.sets = [];

        if ( hasPicture ) {
            imageData.pic = true;
            getAllSourceElements( parent, imageData.sets );
        }

        if ( imageData.srcset ) {
            imageSet = {
                srcset: imageData.srcset,
                sizes: getImgAttr.call( element, "sizes" )
            };

            imageData.sets.push( imageSet );

            isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");

            // add normal src as candidate, if source has no w descriptor
            if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
                imageSet.srcset += ", " + imageData.src;
                imageSet.cands.push({
                    url: imageData.src,
                    d: 1,
                    set: imageSet
                });
            }

        } else if ( imageData.src ) {
            imageData.sets.push( {
                srcset: imageData.src,
                sizes: null
            } );
        }

        imageData.curCan = null;
        imageData.curSrc = undefined;

        // if img has picture or the srcset was removed or has a srcset and does not support srcset at all
        // or has a w descriptor (and does not support sizes) set support to false to evaluate
        imageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );

        if ( srcsetParsed && pf.supSrcset && !imageData.supported ) {
            if ( srcsetAttribute ) {
                setImgAttr.call( element, srcsetAttr, srcsetAttribute );
                element.srcset = "";
            } else {
                removeImgAttr.call( element, srcsetAttr );
            }
        }

        if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {
            if (imageData.src === null) {
                element.removeAttribute("src");
            } else {
                element.src = imageData.src;
            }
        }

        imageData.parsed = true;
    };

    pf.fillImg = function(element, options) {
        var imageData;
        var extreme = options.reselect || options.reevaluate;

        // expando for caching data on the img
        if ( !element[ pf.ns ] ) {
            element[ pf.ns ] = {};
        }

        imageData = element[ pf.ns ];

        // if the element has already been evaluated, skip it
        // unless `options.reevaluate` is set to true ( this, for example,
        // is set to true when running `picturefill` on `resize` ).
        if ( !extreme && imageData.evaled === evalId ) {
            return;
        }

        if ( !imageData.parsed || options.reevaluate ) {
            pf.parseSets( element, element.parentNode, options );
        }

        if ( !imageData.supported ) {
            applyBestCandidate( element );
        } else {
            imageData.evaled = evalId;
        }
    };

    pf.setupRun = function() {
        if ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {
            updateMetrics();
        }
    };

    // If picture is supported, well, that's awesome.
    if ( pf.supPicture ) {
        picturefill = noop;
        pf.fillImg = noop;
    } else {

        // Set up picture polyfill by polling the document
        (function() {
            var isDomReady;
            var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

            var run = function() {
                var readyState = document.readyState || "";

                timerId = setTimeout(run, readyState === "loading" ? 200 :  999);
                if ( document.body ) {
                    pf.fillImgs();
                    isDomReady = isDomReady || regReady.test(readyState);
                    if ( isDomReady ) {
                        clearTimeout( timerId );
                    }

                }
            };

            var timerId = setTimeout(run, document.body ? 9 : 99);

            // Also attach picturefill on resize and readystatechange
            // http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
            var debounce = function(func, wait) {
                var timeout, timestamp;
                var later = function() {
                    var last = (new Date()) - timestamp;

                    if (last < wait) {
                        timeout = setTimeout(later, wait - last);
                    } else {
                        timeout = null;
                        func();
                    }
                };

                return function() {
                    timestamp = new Date();

                    if (!timeout) {
                        timeout = setTimeout(later, wait);
                    }
                };
            };
            var lastClientWidth = docElem.clientHeight;
            var onResize = function() {
                isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
                lastClientWidth = docElem.clientHeight;
                if ( isVwDirty ) {
                    pf.fillImgs();
                }
            };

            on( window, "resize", debounce(onResize, 99 ) );
            on( document, "readystatechange", run );
        })();
    }

    pf.picturefill = picturefill;
    //use this internally for easy monkey patching/performance testing
    pf.fillImgs = picturefill;
    pf.teardownRun = noop;

    /* expose methods for testing */
    picturefill._ = pf;

    window.picturefillCFG = {
        pf: pf,
        push: function(args) {
            var name = args.shift();
            if (typeof pf[name] === "function") {
                pf[name].apply(pf, args);
            } else {
                cfg[name] = args[0];
                if (alreadyRun) {
                    pf.fillImgs( { reselect: true } );
                }
            }
        }
    };

    while (setOptions && setOptions.length) {
        window.picturefillCFG.push(setOptions.shift());
    }

    /* expose picturefill */
    window.picturefill = picturefill;

    /* expose picturefill */
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // CommonJS, just export
        module.exports = picturefill;
    } else if ( typeof define === "function" && define.amd ) {
        // AMD support
        define( "picturefill", function() { return picturefill; } );
    }

    // IE8 evals this sync, so it must be the last thing we do
    if ( !pf.supPicture ) {
        types[ "image/webp" ] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==" );
    }

} )( window, document );

!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();
'use strict';

// добавялет маску к номеру телефона

var telInputs = Array.prototype.slice.call(document.querySelectorAll('input[type=tel]'));
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};


telInputs.forEach(function (it) {
  if (it) {
    var mask = IMask(it, maskOptions);
  }
});

