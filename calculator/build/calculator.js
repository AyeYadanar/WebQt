
var calculator_entry = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName = _scriptName || __filename;
  return (
function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;

var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});

[ "_memory", "___indirect_function_table", "_jsHaveAsyncify", "_jsHaveJspi", "___asyncjs__qt_asyncify_suspend_js", "_qt_asyncify_resume_js", "_main", "onRuntimeInitialized" ].forEach(prop => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),
      set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).
// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == "object";

var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";

// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";

var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = "";

function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == "undefined" || !process.release || process.release.name !== "node") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split(".").slice(0, 3);
  numericVersion = (numericVersion[0] * 1e4) + (numericVersion[1] * 100) + (numericVersion[2].split("-")[0] * 1);
  var minVersion = 16e4;
  if (numericVersion < 16e4) {
    throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + nodeVersion + ")");
  }
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require("fs");
  var nodePath = require("path");
  scriptDirectory = __dirname + "/";
  // include: node_shell_read.js
  readBinary = filename => {
    // We need to re-wrap `file://` strings to URLs. Normalizing isn't
    // necessary in that case, the path should already be absolute.
    filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
    var ret = fs.readFileSync(filename);
    assert(ret.buffer);
    return ret;
  };
  readAsync = (filename, binary = true) => {
    // See the comment in the `readBinary` function.
    filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
        if (err) reject(err); else resolve(binary ? data.buffer : data);
      });
    });
  };
  // end include: node_shell_read.js
  if (!Module["thisProgram"] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, "/");
  }
  arguments_ = process.argv.slice(2);
  // MODULARIZE will export the module in the proper place outside, we don't need to export here
  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };
} else if (ENVIRONMENT_IS_SHELL) {
  if ((typeof process == "object" && typeof require === "function") || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
} else // Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) {
    // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != "undefined" && document.currentScript) {
    // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith("blob:")) {
    scriptDirectory = "";
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
  }
  if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  {
    // include: web_or_worker_shell_read.js
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = url => {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
      };
    }
    readAsync = url => {
      // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
      // See https://github.com/github/fetch/pull/92#issuecomment-140665932
      // Cordova or Electron apps are typically loaded from a file:// url.
      // So use XHR on webview if URL is a file URL.
      if (isFileURI(url)) {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              // file URLs can return 0
              resolve(xhr.response);
              return;
            }
            reject(xhr.status);
          };
          xhr.onerror = reject;
          xhr.send(null);
        });
      }
      return fetch(url, {
        credentials: "same-origin"
      }).then(response => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + " : " + response.url));
      });
    };
  }
} else // end include: web_or_worker_shell_read.js
{
  throw new Error("environment detection error");
}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);

// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;

checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module["arguments"]) arguments_ = Module["arguments"];

legacyModuleProp("arguments", "arguments_");

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

legacyModuleProp("thisProgram", "thisProgram");

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] == "undefined", "Module.read option was removed");

assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");

assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");

legacyModuleProp("asm", "wasmExports");

legacyModuleProp("readAsync", "readAsync");

legacyModuleProp("readBinary", "readBinary");

legacyModuleProp("setWindowTitle", "setWindowTitle");

var IDBFS = "IDBFS is no longer included by default; build with -lidbfs.js";

var PROXYFS = "PROXYFS is no longer included by default; build with -lproxyfs.js";

var WORKERFS = "WORKERFS is no longer included by default; build with -lworkerfs.js";

var FETCHFS = "FETCHFS is no longer included by default; build with -lfetchfs.js";

var ICASEFS = "ICASEFS is no longer included by default; build with -licasefs.js";

var JSFILEFS = "JSFILEFS is no longer included by default; build with -ljsfilefs.js";

var OPFS = "OPFS is no longer included by default; build with -lopfs.js";

var NODEFS = "NODEFS is no longer included by default; build with -lnodefs.js";

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");

// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===
// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html
var wasmBinary = Module["wasmBinary"];

legacyModuleProp("wasmBinary", "wasmBinary");

if (typeof WebAssembly != "object") {
  err("no native wasm support detected");
}

// Wasm globals
var wasmMemory;

//========================================
// Runtime essentials
//========================================
// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */ function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed" + (text ? ": " + text : ""));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
// Memory management
var HEAP, /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /* BigInt64Array type is not correctly defined in closure
/** not-@type {!BigInt64Array} */ HEAP64, /* BigUint64Array type is not correctly defined in closure
/** not-t@type {!BigUint64Array} */ HEAPU64, /** @type {!Float64Array} */ HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module["HEAP8"] = HEAP8 = new Int8Array(b);
  Module["HEAP16"] = HEAP16 = new Int16Array(b);
  Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
  Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
  Module["HEAP32"] = HEAP32 = new Int32Array(b);
  Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
  Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
  Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
  Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
  Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
}

// end include: runtime_shared.js
assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");

assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");

assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max) >>> 2) >>> 0] = 34821223;
  HEAPU32[(((max) + (4)) >>> 2) >>> 0] = 2310721022;
  // Also test the global address 0 for integrity.
  HEAPU32[((0) >>> 2) >>> 0] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max) >>> 2) >>> 0];
  var cookie2 = HEAPU32[(((max) + (4)) >>> 2) >>> 0];
  if (cookie1 != 34821223 || cookie2 != 2310721022) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0) >>> 2) >>> 0] != 1668509029) /* 'emsc' */ {
    abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}

// end include: runtime_stack_check.js
var __ATPRERUN__ = [];

// functions called before the runtime is initialized
var __ATINIT__ = [];

// functions called during startup
var __ATMAIN__ = [];

// functions called when main() is to be run
var __ATEXIT__ = [];

// functions called during shutdown
var __ATPOSTRUN__ = [];

// functions called after the main() is called
var runtimeInitialized = false;

function preRun() {
  var preRuns = Module["preRun"];
  if (preRuns) {
    if (typeof preRuns == "function") preRuns = [ preRuns ];
    preRuns.forEach(addOnPreRun);
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;
  checkStackCookie();
  if (!Module["noFSInit"] && !FS.initialized) FS.init();
  FS.ignorePermissions = false;
  TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();
  var postRuns = Module["postRun"];
  if (postRuns) {
    if (typeof postRuns == "function") postRuns = [ postRuns ];
    postRuns.forEach(addOnPostRun);
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

// overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != "undefined") {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err("still waiting on run dependencies:");
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err("(end of list)");
        }
      }, 1e4);
    }
  } else {
    err("warning: run dependency added without ID");
  }
}

function removeRunDependency(id) {
  runDependencies--;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err("warning: run dependency removed without ID");
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
}

/** @param {string|number=} what */ function abort(what) {
  Module["onAbort"]?.(what);
  what = "Aborted(" + what + ")";
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);
  ABORT = true;
  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.
  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = "data:application/octet-stream;base64,";

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */ var isDataURI = filename => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
  var f = "calculator.wasm";
  if (!isDataURI(f)) {
    return locateFile(f);
  }
  return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary) {
    // Fetch the binary using readAsync
    return readAsync(binaryFile).then(response => new Uint8Array(/** @type{!ArrayBuffer} */ (response)), // Fall back to getBinarySync if readAsync fails
    () => getBinarySync(binaryFile));
  }
  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(receiver, reason => {
    err(`failed to asynchronously prepare wasm: ${reason}`);
    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
  !isFileURI(binaryFile) && // Avoid instantiateStreaming() on Node.js environment for now, as while
  // Node.js v18.1.0 implements it, it does not have a full fetch()
  // implementation yet.
  // Reference:
  //   https://github.com/emscripten-core/emscripten/pull/16917
  !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
    return fetch(binaryFile, {
      credentials: "same-origin"
    }).then(response => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
      return result.then(callback, function(reason) {
        // We expect the most common failure cause to be a bad MIME type for the binary,
        // in which case falling back to ArrayBuffer instantiation should work.
        err(`wasm streaming compile failed: ${reason}`);
        err("falling back to ArrayBuffer instantiation");
        return instantiateArrayBuffer(binaryFile, imports, callback);
      });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    "env": wasmImports,
    "wasi_snapshot_preview1": wasmImports
  };
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
    wasmExports = instance.exports;
    wasmExports = applySignatureConversions(wasmExports);
    wasmMemory = wasmExports["memory"];
    assert(wasmMemory, "memory not found in wasm exports");
    updateMemoryViews();
    wasmTable = wasmExports["__indirect_function_table"];
    assert(wasmTable, "table not found in wasm exports");
    addOnInit(wasmExports["__wasm_call_ctors"]);
    removeRunDependency("wasm-instantiate");
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency("wasm-instantiate");
  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result["instance"]);
  }
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module["instantiateWasm"]) {
    try {
      return Module["instantiateWasm"](info, receiveInstance);
    } catch (e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
      // If instantiation fails, reject the module ready promise.
      readyPromiseReject(e);
    }
  }
  wasmBinaryFile ??= findWasmBinary();
  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {};
}

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 25459;
  if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
})();

if (Module["ENVIRONMENT"]) {
  throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}

function legacyModuleProp(prop, newName, incoming = true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || // The old FS has some functionality that WasmFS lacks.
  name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */ function hookGlobalSymbolAccess(sym, func) {}

// In MODULARIZE mode the generated code runs inside a function scope and not
// the global scope, and JavaScript does not provide access to function scopes
// so we cannot dynamically modify the scrope using `defineProperty` in this
// case.
// In this mode we simply ignore requests for `hookGlobalSymbolAccess`. Since
// this is a debug-only feature, skipping it is not major issue.
function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

missingGlobal("asm", "Please use wasmExports instead");

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
      librarySymbol = "$" + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
  });
  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}

// end include: runtime_debug.js
// === Body ===
function jsHaveAsyncify() {
  return typeof Asyncify !== "undefined";
}

function jsHaveJspi() {
  return typeof Asyncify !== "undefined" && !!Asyncify.makeAsyncFunction && (!!WebAssembly.Function || !!WebAssembly.Suspending);
}

function __asyncjs__qt_asyncify_suspend_js() {
  return Asyncify.handleAsync(async () => {
    if (Module.qtSuspendId === undefined) Module.qtSuspendId = 0;
    ++Module.qtSuspendId;
    await new Promise(resolve => {
      Module.qtAsyncifyWakeUp = resolve;
    });
  });
}

function qt_asyncify_resume_js() {
  let wakeUp = Module.qtAsyncifyWakeUp;
  if (wakeUp == undefined) return;
  Module.qtAsyncifyWakeUp = undefined;
  const suspendId = Module.qtSuspendId;
  setTimeout(() => {
    if (Module.qtSuspendId !== suspendId) return;
    wakeUp();
  });
}

// end include: preamble.js
/** @constructor */ function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = `Program terminated with exit(${status})`;
  this.status = status;
}

var callRuntimeCallbacks = callbacks => {
  // Pass the module as the first argument.
  callbacks.forEach(f => f(Module));
};

/**
     * @param {number} ptr
     * @param {string} type
     */ function getValue(ptr, type = "i8") {
  if (type.endsWith("*")) type = "*";
  switch (type) {
   case "i1":
    return HEAP8[ptr >>> 0];

   case "i8":
    return HEAP8[ptr >>> 0];

   case "i16":
    return HEAP16[((ptr) >>> 1) >>> 0];

   case "i32":
    return HEAP32[((ptr) >>> 2) >>> 0];

   case "i64":
    return HEAP64[((ptr) >>> 3)];

   case "float":
    return HEAPF32[((ptr) >>> 2) >>> 0];

   case "double":
    return HEAPF64[((ptr) >>> 3) >>> 0];

   case "*":
    return HEAPU32[((ptr) >>> 2) >>> 0];

   default:
    abort(`invalid type for getValue: ${type}`);
  }
}

var noExitRuntime = Module["noExitRuntime"] || true;

var ptrToString = ptr => {
  assert(typeof ptr === "number");
  return "0x" + ptr.toString(16).padStart(8, "0");
};

/**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */ function setValue(ptr, value, type = "i8") {
  if (type.endsWith("*")) type = "*";
  switch (type) {
   case "i1":
    HEAP8[ptr >>> 0] = value;
    break;

   case "i8":
    HEAP8[ptr >>> 0] = value;
    break;

   case "i16":
    HEAP16[((ptr) >>> 1) >>> 0] = value;
    break;

   case "i32":
    HEAP32[((ptr) >>> 2) >>> 0] = value;
    break;

   case "i64":
    HEAP64[((ptr) >>> 3)] = BigInt(value);
    break;

   case "float":
    HEAPF32[((ptr) >>> 2) >>> 0] = value;
    break;

   case "double":
    HEAPF64[((ptr) >>> 3) >>> 0] = value;
    break;

   case "*":
    HEAPU32[((ptr) >>> 2) >>> 0] = value;
    break;

   default:
    abort(`invalid type for setValue: ${type}`);
  }
}

var stackRestore = val => __emscripten_stack_restore(val);

var stackSave = () => _emscripten_stack_get_current();

var warnOnce = text => {
  warnOnce.shown ||= {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
    err(text);
  }
};

var INT53_MAX = 9007199254740992;

var INT53_MIN = -9007199254740992;

var bigintToI53Checked = num => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder : undefined;

/**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */ var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
  idx >>>= 0;
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on
  // null terminator by itself.  Also, use the length info to avoid running tiny
  // strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation,
  // so that undefined/NaN means Infinity)
  while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
    return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
  }
  var str = "";
  // If building with TextDecoder, we have already computed the string length
  // above, so test loop end condition against that
  while (idx < endPtr) {
    // For UTF8 byte structure, see:
    // http://en.wikipedia.org/wiki/UTF-8#Description
    // https://www.ietf.org/rfc/rfc2279.txt
    // https://tools.ietf.org/html/rfc3629
    var u0 = heapOrArray[idx++];
    if (!(u0 & 128)) {
      str += String.fromCharCode(u0);
      continue;
    }
    var u1 = heapOrArray[idx++] & 63;
    if ((u0 & 224) == 192) {
      str += String.fromCharCode(((u0 & 31) << 6) | u1);
      continue;
    }
    var u2 = heapOrArray[idx++] & 63;
    if ((u0 & 240) == 224) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
    } else {
      if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
      u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
    }
    if (u0 < 65536) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 65536;
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
    }
  }
  return str;
};

/**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */ var UTF8ToString = (ptr, maxBytesToRead) => {
  assert(typeof ptr == "number", `UTF8ToString expects a number (got ${typeof ptr})`);
  ptr >>>= 0;
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

function ___assert_fail(condition, filename, line, func) {
  condition >>>= 0;
  filename >>>= 0;
  func >>>= 0;
  abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

var wasmTableMirror = [];

/** @type {WebAssembly.Table} */ var wasmTable;

var getWasmTableEntry = funcPtr => {
  var func = wasmTableMirror[funcPtr];
  if (!func) {
    if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
    wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
  }
  assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
  return func;
};

function ___call_sighandler(fp, sig) {
  fp >>>= 0;
  return getWasmTableEntry(fp)(sig);
}

var exceptionCaught = [];

var uncaughtExceptionCount = 0;

function ___cxa_begin_catch(ptr) {
  ptr >>>= 0;
  var info = new ExceptionInfo(ptr);
  if (!info.get_caught()) {
    info.set_caught(true);
    uncaughtExceptionCount--;
  }
  info.set_rethrown(false);
  exceptionCaught.push(info);
  ___cxa_increment_exception_refcount(ptr);
  return ___cxa_get_exception_ptr(ptr);
}

var exceptionLast = 0;

var ___cxa_end_catch = () => {
  // Clear state flag.
  _setThrew(0, 0);
  assert(exceptionCaught.length > 0);
  // Call destructor if one is registered then clear it.
  var info = exceptionCaught.pop();
  ___cxa_decrement_exception_refcount(info.excPtr);
  exceptionLast = 0;
};

// XXX in decRef?
class ExceptionInfo {
  // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
  constructor(excPtr) {
    this.excPtr = excPtr;
    this.ptr = excPtr - 24;
  }
  set_type(type) {
    HEAPU32[(((this.ptr) + (4)) >>> 2) >>> 0] = type;
  }
  get_type() {
    return HEAPU32[(((this.ptr) + (4)) >>> 2) >>> 0];
  }
  set_destructor(destructor) {
    HEAPU32[(((this.ptr) + (8)) >>> 2) >>> 0] = destructor;
  }
  get_destructor() {
    return HEAPU32[(((this.ptr) + (8)) >>> 2) >>> 0];
  }
  set_caught(caught) {
    caught = caught ? 1 : 0;
    HEAP8[(this.ptr) + (12) >>> 0] = caught;
  }
  get_caught() {
    return HEAP8[(this.ptr) + (12) >>> 0] != 0;
  }
  set_rethrown(rethrown) {
    rethrown = rethrown ? 1 : 0;
    HEAP8[(this.ptr) + (13) >>> 0] = rethrown;
  }
  get_rethrown() {
    return HEAP8[(this.ptr) + (13) >>> 0] != 0;
  }
  // Initialize native structure fields. Should be called once after allocated.
  init(type, destructor) {
    this.set_adjusted_ptr(0);
    this.set_type(type);
    this.set_destructor(destructor);
  }
  set_adjusted_ptr(adjustedPtr) {
    HEAPU32[(((this.ptr) + (16)) >>> 2) >>> 0] = adjustedPtr;
  }
  get_adjusted_ptr() {
    return HEAPU32[(((this.ptr) + (16)) >>> 2) >>> 0];
  }
}

function ___resumeException(ptr) {
  ptr >>>= 0;
  if (!exceptionLast) {
    exceptionLast = ptr;
  }
  assert(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}

var setTempRet0 = val => __emscripten_tempret_set(val);

var findMatchingCatch = args => {
  var thrown = exceptionLast;
  if (!thrown) {
    // just pass through the null ptr
    setTempRet0(0);
    return 0;
  }
  var info = new ExceptionInfo(thrown);
  info.set_adjusted_ptr(thrown);
  var thrownType = info.get_type();
  if (!thrownType) {
    // just pass through the thrown ptr
    setTempRet0(0);
    return thrown;
  }
  // can_catch receives a **, add indirection
  // The different catch blocks are denoted by different types.
  // Due to inheritance, those types may not precisely match the
  // type of the thrown object. Find one which matches, and
  // return the type of the catch block which should be called.
  for (var caughtType of args) {
    if (caughtType === 0 || caughtType === thrownType) {
      // Catch all clause matched or exactly the same type is caught
      break;
    }
    var adjusted_ptr_addr = info.ptr + 16;
    if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
      setTempRet0(caughtType);
      return thrown;
    }
  }
  setTempRet0(thrownType);
  return thrown;
};

function ___cxa_find_matching_catch_2() {
  return findMatchingCatch([]);
}

function ___cxa_find_matching_catch_3(arg0) {
  arg0 >>>= 0;
  return findMatchingCatch([ arg0 ]);
}

var ___cxa_rethrow = () => {
  var info = exceptionCaught.pop();
  if (!info) {
    abort("no exception to throw");
  }
  var ptr = info.excPtr;
  if (!info.get_rethrown()) {
    // Only pop if the corresponding push was through rethrow_primary_exception
    exceptionCaught.push(info);
    info.set_rethrown(true);
    info.set_caught(false);
    uncaughtExceptionCount++;
  }
  exceptionLast = ptr;
  assert(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
};

function ___cxa_throw(ptr, type, destructor) {
  ptr >>>= 0;
  type >>>= 0;
  destructor >>>= 0;
  var info = new ExceptionInfo(ptr);
  // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
  info.init(type, destructor);
  exceptionLast = ptr;
  uncaughtExceptionCount++;
  assert(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}

var PATH = {
  isAbs: path => path.charAt(0) === "/",
  splitPath: filename => {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: (parts, allowAboveRoot) => {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (;up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: path => {
    var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
    // Normalize the path
    path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: path => {
    var result = PATH.splitPath(path), root = result[0], dir = result[1];
    if (!root && !dir) {
      // No dirname whatsoever
      return ".";
    }
    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  },
  basename: path => {
    // EMSCRIPTEN return '/'' for '/', not an empty string
    if (path === "/") return "/";
    path = PATH.normalize(path);
    path = path.replace(/\/$/, "");
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1) return path;
    return path.substr(lastSlash + 1);
  },
  join: (...paths) => PATH.normalize(paths.join("/")),
  join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => {
  if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
    // for modern web browsers
    return view => crypto.getRandomValues(view);
  } else if (ENVIRONMENT_IS_NODE) {
    // for nodejs with or without crypto support included
    try {
      var crypto_module = require("crypto");
      var randomFillSync = crypto_module["randomFillSync"];
      if (randomFillSync) {
        // nodejs with LTS crypto support
        return view => crypto_module["randomFillSync"](view);
      }
      // very old nodejs with the original crypto API
      var randomBytes = crypto_module["randomBytes"];
      return view => (view.set(randomBytes(view.byteLength)), // Return the original view to match modern native implementations.
      view);
    } catch (e) {}
  }
  // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
  abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
};

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
  resolve: (...args) => {
    var resolvedPath = "", resolvedAbsolute = false;
    for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? args[i] : FS.cwd();
      // Skip empty and invalid entries
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      // an invalid portion invalidates the whole thing
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = PATH.isAbs(path);
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
    return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
  },
  relative: (from, to) => {
    from = PATH_FS.resolve(from).substr(1);
    to = PATH_FS.resolve(to).substr(1);
    function trim(arr) {
      var start = 0;
      for (;start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (;end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
    // unit, not a Unicode code point of the character! So decode
    // UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var c = str.charCodeAt(i);
    // possibly a lead surrogate
    if (c <= 127) {
      len++;
    } else if (c <= 2047) {
      len += 2;
    } else if (c >= 55296 && c <= 57343) {
      len += 4;
      ++i;
    } else {
      len += 3;
    }
  }
  return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
  outIdx >>>= 0;
  assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
  // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
  // undefined and false each don't write out any bytes.
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
    // unit, not a Unicode code point of the character! So decode
    // UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
    // and https://www.ietf.org/rfc/rfc2279.txt
    // and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i);
    // possibly a lead surrogate
    if (u >= 55296 && u <= 57343) {
      var u1 = str.charCodeAt(++i);
      u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
    }
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      heap[outIdx++ >>> 0] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++ >>> 0] = 192 | (u >> 6);
      heap[outIdx++ >>> 0] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++ >>> 0] = 224 | (u >> 12);
      heap[outIdx++ >>> 0] = 128 | ((u >> 6) & 63);
      heap[outIdx++ >>> 0] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      heap[outIdx++ >>> 0] = 240 | (u >> 18);
      heap[outIdx++ >>> 0] = 128 | ((u >> 12) & 63);
      heap[outIdx++ >>> 0] = 128 | ((u >> 6) & 63);
      heap[outIdx++ >>> 0] = 128 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx >>> 0] = 0;
  return outIdx - startIdx;
};

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

var FS_stdin_getChar = () => {
  if (!FS_stdin_getChar_buffer.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
      // we will read data by chunks of BUFSIZE
      var BUFSIZE = 256;
      var buf = Buffer.alloc(BUFSIZE);
      var bytesRead = 0;
      // For some reason we must suppress a closure warning here, even though
      // fd definitely exists on process.stdin, and is even the proper way to
      // get the fd of stdin,
      // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
      // This started to happen after moving this logic out of library_tty.js,
      // so it is related to the surrounding code in some unclear manner.
      /** @suppress {missingProperties} */ var fd = process.stdin.fd;
      try {
        bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
      } catch (e) {
        // Cross-platform differences: on Windows, reading EOF throws an
        // exception, but on other OSes, reading EOF returns 0. Uniformize
        // behavior by treating the EOF exception to return 0.
        if (e.toString().includes("EOF")) bytesRead = 0; else throw e;
      }
      if (bytesRead > 0) {
        result = buf.slice(0, bytesRead).toString("utf-8");
      }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
      // Browser.
      result = window.prompt("Input: ");
      // returns null on cancel
      if (result !== null) {
        result += "\n";
      }
    } else {}
    if (!result) {
      return null;
    }
    FS_stdin_getChar_buffer = intArrayFromString(result, true);
  }
  return FS_stdin_getChar_buffer.shift();
};

var TTY = {
  ttys: [],
  init() {},
  // https://github.com/emscripten-core/emscripten/pull/1555
  // if (ENVIRONMENT_IS_NODE) {
  //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
  //   // device, it always assumes it's a TTY device. because of this, we're forcing
  //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
  //   // with text files until FS.init can be refactored.
  //   process.stdin.setEncoding('utf8');
  // }
  shutdown() {},
  // https://github.com/emscripten-core/emscripten/pull/1555
  // if (ENVIRONMENT_IS_NODE) {
  //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
  //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
  //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
  //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
  //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
  //   process.stdin.pause();
  // }
  register(dev, ops) {
    TTY.ttys[dev] = {
      input: [],
      output: [],
      ops
    };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close(stream) {
      // flush any pending line data
      stream.tty.ops.fsync(stream.tty);
    },
    fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    read(stream, buffer, offset, length, pos) {
      /* ignored */ if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }
      return bytesRead;
    },
    write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.timestamp = Date.now();
      }
      return i;
    }
  },
  default_tty_ops: {
    get_char(tty) {
      return FS_stdin_getChar();
    },
    put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    // val == 0 would cut text output off in the middle.
    fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    },
    ioctl_tcgets(tty) {
      // typical setting
      return {
        c_iflag: 25856,
        c_oflag: 5,
        c_cflag: 191,
        c_lflag: 35387,
        c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      };
    },
    ioctl_tcsets(tty, optional_actions, data) {
      // currently just ignore
      return 0;
    },
    ioctl_tiocgwinsz(tty) {
      return [ 24, 80 ];
    }
  },
  default_tty1_ops: {
    put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    }
  }
};

var zeroMemory = (address, size) => {
  HEAPU8.fill(0, address, address + size);
};

var alignMemory = (size, alignment) => {
  assert(alignment, "alignment argument is required");
  return Math.ceil(size / alignment) * alignment;
};

var mmapAlloc = size => {
  size = alignMemory(size, 65536);
  var ptr = _emscripten_builtin_memalign(65536, size);
  if (ptr) zeroMemory(ptr, size);
  return ptr;
};

var MEMFS = {
  ops_table: null,
  mount(mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
  },
  createNode(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      // no supported
      throw new FS.ErrnoError(63);
    }
    MEMFS.ops_table ||= {
      dir: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          lookup: MEMFS.node_ops.lookup,
          mknod: MEMFS.node_ops.mknod,
          rename: MEMFS.node_ops.rename,
          unlink: MEMFS.node_ops.unlink,
          rmdir: MEMFS.node_ops.rmdir,
          readdir: MEMFS.node_ops.readdir,
          symlink: MEMFS.node_ops.symlink
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek
        }
      },
      file: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek,
          read: MEMFS.stream_ops.read,
          write: MEMFS.stream_ops.write,
          allocate: MEMFS.stream_ops.allocate,
          mmap: MEMFS.stream_ops.mmap,
          msync: MEMFS.stream_ops.msync
        }
      },
      link: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          readlink: MEMFS.node_ops.readlink
        },
        stream: {}
      },
      chrdev: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr
        },
        stream: FS.chrdev_stream_ops
      }
    };
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
      // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
      // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
      // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.timestamp = Date.now();
    // add the new node to the parent
    if (parent) {
      parent.contents[name] = node;
      parent.timestamp = node.timestamp;
    }
    return node;
  },
  getFileDataAsTypedArray(node) {
    if (!node.contents) return new Uint8Array(0);
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
    // Make sure to not return excess unused bytes.
    return new Uint8Array(node.contents);
  },
  expandFileStorage(node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    // No need to expand, the storage was already large enough.
    // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
    // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
    // avoid overshooting the allocation cap by a very large margin.
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    // At minimum allocate 256b for each file when expanding.
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    // Allocate new storage.
    if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  },
  // Copy old data over to the new storage.
  resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      // Fully decommit when requesting a resize to zero.
      node.usedBytes = 0;
    } else {
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      // Allocate new storage.
      if (oldContents) {
        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      }
      // Copy old data over to the new storage.
      node.usedBytes = newSize;
    }
  },
  node_ops: {
    getattr(node) {
      var attr = {};
      // device numbers reuse inode numbers.
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
      //       but this is not required by the standard.
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr(node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode;
      }
      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp;
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup(parent, name) {
      throw FS.genericErrors[44];
    },
    mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename(old_node, new_dir, new_name) {
      // if we're overwriting a directory at new_name, make sure it's empty.
      if (FS.isDir(old_node.mode)) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
      }
      // do the internal rewiring
      delete old_node.parent.contents[old_node.name];
      old_node.parent.timestamp = Date.now();
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      new_dir.timestamp = old_node.parent.timestamp;
    },
    unlink(parent, name) {
      delete parent.contents[name];
      parent.timestamp = Date.now();
    },
    rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.timestamp = Date.now();
    },
    readdir(node) {
      var entries = [ ".", ".." ];
      for (var key of Object.keys(node.contents)) {
        entries.push(key);
      }
      return entries;
    },
    symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | /* 0777 */ 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    }
  },
  stream_ops: {
    read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      assert(size >= 0);
      if (size > 8 && contents.subarray) {
        // non-trivial, and typed array
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
      }
      return size;
    },
    write(stream, buffer, offset, length, position, canOwn) {
      // The data buffer should be a typed array view
      assert(!(buffer instanceof ArrayBuffer));
      // If the buffer is located in main memory (HEAP), and if
      // memory can grow, we can't hold on to references of the
      // memory buffer, as they may get invalidated. That means we
      // need to do copy its contents.
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.timestamp = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        // This write is from a typed array to a typed array?
        if (canOwn) {
          assert(position === 0, "canOwn must imply no weird position inside the file");
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          // Writing to an already allocated and used subrange of the file?
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        // Use typed array write which is available.
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    },
    llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    allocate(stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    },
    mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      // Only make a new copy when MAP_PRIVATE is specified.
      if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
        // We can't emulate MAP_SHARED when the file is not backed by the
        // buffer we're mapping to (e.g. the HEAP buffer).
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          // Try to avoid unnecessary slices.
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          HEAP8.set(contents, ptr >>> 0);
        }
      }
      return {
        ptr,
        allocated
      };
    },
    msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      // should we check if bytesWritten and length are the same?
      return 0;
    }
  }
};

/** @param {boolean=} noRunDep */ var asyncLoad = (url, onload, onerror, noRunDep) => {
  var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
  readAsync(url).then(arrayBuffer => {
    assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
    onload(new Uint8Array(arrayBuffer));
    if (dep) removeRunDependency(dep);
  }, err => {
    if (onerror) {
      onerror();
    } else {
      throw `Loading data file "${url}" failed.`;
    }
  });
  if (dep) addRunDependency(dep);
};

var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
  FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
};

var preloadPlugins = Module["preloadPlugins"] || [];

var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
  // Ensure plugins are ready.
  if (typeof Browser != "undefined") Browser.init();
  var handled = false;
  preloadPlugins.forEach(plugin => {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
      plugin["handle"](byteArray, fullname, finish, onerror);
      handled = true;
    }
  });
  return handled;
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
  // TODO we should allow people to just pass in a complete filename instead
  // of parent and name being that we just join them anyways
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency(`cp ${fullname}`);
  // might have several active requests for the same fullname
  function processData(byteArray) {
    function finish(byteArray) {
      preFinish?.();
      if (!dontCreateFile) {
        FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
      }
      onload?.();
      removeRunDependency(dep);
    }
    if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
      onerror?.();
      removeRunDependency(dep);
    })) {
      return;
    }
    finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
    asyncLoad(url, processData, onerror);
  } else {
    processData(url);
  }
};

var FS_modeStringToFlags = str => {
  var flagModes = {
    "r": 0,
    "r+": 2,
    "w": 512 | 64 | 1,
    "w+": 512 | 64 | 2,
    "a": 1024 | 64 | 1,
    "a+": 1024 | 64 | 2
  };
  var flags = flagModes[str];
  if (typeof flags == "undefined") {
    throw new Error(`Unknown file open mode: ${str}`);
  }
  return flags;
};

var FS_getMode = (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
};

var strError = errno => UTF8ToString(_strerror(errno));

var ERRNO_CODES = {
  "EPERM": 63,
  "ENOENT": 44,
  "ESRCH": 71,
  "EINTR": 27,
  "EIO": 29,
  "ENXIO": 60,
  "E2BIG": 1,
  "ENOEXEC": 45,
  "EBADF": 8,
  "ECHILD": 12,
  "EAGAIN": 6,
  "EWOULDBLOCK": 6,
  "ENOMEM": 48,
  "EACCES": 2,
  "EFAULT": 21,
  "ENOTBLK": 105,
  "EBUSY": 10,
  "EEXIST": 20,
  "EXDEV": 75,
  "ENODEV": 43,
  "ENOTDIR": 54,
  "EISDIR": 31,
  "EINVAL": 28,
  "ENFILE": 41,
  "EMFILE": 33,
  "ENOTTY": 59,
  "ETXTBSY": 74,
  "EFBIG": 22,
  "ENOSPC": 51,
  "ESPIPE": 70,
  "EROFS": 69,
  "EMLINK": 34,
  "EPIPE": 64,
  "EDOM": 18,
  "ERANGE": 68,
  "ENOMSG": 49,
  "EIDRM": 24,
  "ECHRNG": 106,
  "EL2NSYNC": 156,
  "EL3HLT": 107,
  "EL3RST": 108,
  "ELNRNG": 109,
  "EUNATCH": 110,
  "ENOCSI": 111,
  "EL2HLT": 112,
  "EDEADLK": 16,
  "ENOLCK": 46,
  "EBADE": 113,
  "EBADR": 114,
  "EXFULL": 115,
  "ENOANO": 104,
  "EBADRQC": 103,
  "EBADSLT": 102,
  "EDEADLOCK": 16,
  "EBFONT": 101,
  "ENOSTR": 100,
  "ENODATA": 116,
  "ETIME": 117,
  "ENOSR": 118,
  "ENONET": 119,
  "ENOPKG": 120,
  "EREMOTE": 121,
  "ENOLINK": 47,
  "EADV": 122,
  "ESRMNT": 123,
  "ECOMM": 124,
  "EPROTO": 65,
  "EMULTIHOP": 36,
  "EDOTDOT": 125,
  "EBADMSG": 9,
  "ENOTUNIQ": 126,
  "EBADFD": 127,
  "EREMCHG": 128,
  "ELIBACC": 129,
  "ELIBBAD": 130,
  "ELIBSCN": 131,
  "ELIBMAX": 132,
  "ELIBEXEC": 133,
  "ENOSYS": 52,
  "ENOTEMPTY": 55,
  "ENAMETOOLONG": 37,
  "ELOOP": 32,
  "EOPNOTSUPP": 138,
  "EPFNOSUPPORT": 139,
  "ECONNRESET": 15,
  "ENOBUFS": 42,
  "EAFNOSUPPORT": 5,
  "EPROTOTYPE": 67,
  "ENOTSOCK": 57,
  "ENOPROTOOPT": 50,
  "ESHUTDOWN": 140,
  "ECONNREFUSED": 14,
  "EADDRINUSE": 3,
  "ECONNABORTED": 13,
  "ENETUNREACH": 40,
  "ENETDOWN": 38,
  "ETIMEDOUT": 73,
  "EHOSTDOWN": 142,
  "EHOSTUNREACH": 23,
  "EINPROGRESS": 26,
  "EALREADY": 7,
  "EDESTADDRREQ": 17,
  "EMSGSIZE": 35,
  "EPROTONOSUPPORT": 66,
  "ESOCKTNOSUPPORT": 137,
  "EADDRNOTAVAIL": 4,
  "ENETRESET": 39,
  "EISCONN": 30,
  "ENOTCONN": 53,
  "ETOOMANYREFS": 141,
  "EUSERS": 136,
  "EDQUOT": 19,
  "ESTALE": 72,
  "ENOTSUP": 138,
  "ENOMEDIUM": 148,
  "EILSEQ": 25,
  "EOVERFLOW": 61,
  "ECANCELED": 11,
  "ENOTRECOVERABLE": 56,
  "EOWNERDEAD": 62,
  "ESTRPIPE": 135
};

var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  ErrnoError: class extends Error {
    // We set the `name` property to be able to identify `FS.ErrnoError`
    // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
    // - when using PROXYFS, an error can come from an underlying FS
    // as different FS objects have their own FS.ErrnoError each,
    // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
    // we'll use the reliable test `err.name == "ErrnoError"` instead
    constructor(errno) {
      super(runtimeInitialized ? strError(errno) : "");
      // TODO(sbc): Use the inline member declaration syntax once we
      // support it in acorn and closure.
      this.name = "ErrnoError";
      this.errno = errno;
      for (var key in ERRNO_CODES) {
        if (ERRNO_CODES[key] === errno) {
          this.code = key;
          break;
        }
      }
    }
  },
  genericErrors: {},
  filesystems: null,
  syncFSRequests: 0,
  readFiles: {},
  FSStream: class {
    constructor() {
      // TODO(https://github.com/emscripten-core/emscripten/issues/21414):
      // Use inline field declarations.
      this.shared = {};
    }
    get object() {
      return this.node;
    }
    set object(val) {
      this.node = val;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return (this.flags & 1024);
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(val) {
      this.shared.flags = val;
    }
    get position() {
      return this.shared.position;
    }
    set position(val) {
      this.shared.position = val;
    }
  },
  FSNode: class {
    constructor(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      // root node sets parent to itself
      this.parent = parent;
      this.mount = parent.mount;
      this.mounted = null;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.node_ops = {};
      this.stream_ops = {};
      this.rdev = rdev;
      this.readMode = 292 | 73;
      this.writeMode = 146;
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(val) {
      val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(val) {
      val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
    }
    get isFolder() {
      return FS.isDir(this.mode);
    }
    get isDevice() {
      return FS.isChrdev(this.mode);
    }
  },
  lookupPath(path, opts = {}) {
    path = PATH_FS.resolve(path);
    if (!path) return {
      path: "",
      node: null
    };
    var defaults = {
      follow_mount: true,
      recurse_count: 0
    };
    opts = Object.assign(defaults, opts);
    if (opts.recurse_count > 8) {
      // max recursive lookup of 8
      throw new FS.ErrnoError(32);
    }
    // split the absolute path
    var parts = path.split("/").filter(p => !!p);
    // start at the root
    var current = FS.root;
    var current_path = "/";
    for (var i = 0; i < parts.length; i++) {
      var islast = (i === parts.length - 1);
      if (islast && opts.parent) {
        // stop resolving
        break;
      }
      current = FS.lookupNode(current, parts[i]);
      current_path = PATH.join2(current_path, parts[i]);
      // jump to the mount's root node if this is a mountpoint
      if (FS.isMountpoint(current)) {
        if (!islast || (islast && opts.follow_mount)) {
          current = current.mounted.root;
        }
      }
      // by default, lookupPath will not follow a symlink if it is the final path component.
      // setting opts.follow = true will override this behavior.
      if (!islast || opts.follow) {
        var count = 0;
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path);
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count + 1
          });
          current = lookup.node;
          if (count++ > 40) {
            // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
            throw new FS.ErrnoError(32);
          }
        }
      }
    }
    return {
      path: current_path,
      node: current
    };
  },
  getPath(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
      }
      path = path ? `${node.name}/${path}` : node.name;
      node = node.parent;
    }
  },
  hashName(parentid, name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode(parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    // if we failed to find it in the cache, call into the VFS
    return FS.lookup(parent, name);
  },
  createNode(parent, name, mode, rdev) {
    assert(typeof parent == "object");
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode(node) {
    FS.hashRemoveNode(node);
  },
  isRoot(node) {
    return node === node.parent;
  },
  isMountpoint(node) {
    return !!node.mounted;
  },
  isFile(mode) {
    return (mode & 61440) === 32768;
  },
  isDir(mode) {
    return (mode & 61440) === 16384;
  },
  isLink(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket(mode) {
    return (mode & 49152) === 49152;
  },
  flagsToPermissionString(flag) {
    var perms = [ "r", "w", "rw" ][flag & 3];
    if ((flag & 512)) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    // return 0 if any user, group or owner bits are set.
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup(dir) {
    if (!FS.isDir(dir.mode)) return 54;
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate(dir, name) {
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  },
  mayOpen(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || // opening for write
      (flags & 512)) {
        // TODO: check for O_SEARCH? (== search for dir only)
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  },
  MAX_OPEN_FDS: 4096,
  nextfd() {
    for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStreamChecked(fd) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    return stream;
  },
  getStream: fd => FS.streams[fd],
  createStream(stream, fd = -1) {
    assert(fd >= -1);
    // clone it, so we can return an instance of FSStream
    stream = Object.assign(new FS.FSStream, stream);
    if (fd == -1) {
      fd = FS.nextfd();
    }
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream(fd) {
    FS.streams[fd] = null;
  },
  dupStream(origStream, fd = -1) {
    var stream = FS.createStream(origStream, fd);
    stream.stream_ops?.dup?.(stream);
    return stream;
  },
  chrdev_stream_ops: {
    open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      // override node's stream ops with the device's
      stream.stream_ops = device.stream_ops;
      // forward the open call
      stream.stream_ops.open?.(stream);
    },
    llseek() {
      throw new FS.ErrnoError(70);
    }
  },
  major: dev => ((dev) >> 8),
  minor: dev => ((dev) & 255),
  makedev: (ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
    FS.devices[dev] = {
      stream_ops: ops
    };
  },
  getDevice: dev => FS.devices[dev],
  getMounts(mount) {
    var mounts = [];
    var check = [ mount ];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push(...m.mounts);
    }
    return mounts;
  },
  syncfs(populate, callback) {
    if (typeof populate == "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      assert(FS.syncFSRequests > 0);
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    // sync all mounts
    mounts.forEach(mount => {
      if (!mount.type.syncfs) {
        return done(null);
      }
      mount.type.syncfs(mount, populate, done);
    });
  },
  mount(type, opts, mountpoint) {
    if (typeof type == "string") {
      // The filesystem was not included, and instead we have an error
      // message stored in the variable.
      throw type;
    }
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, {
        follow_mount: false
      });
      mountpoint = lookup.path;
      // use the absolute path
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = {
      type,
      opts,
      mountpoint,
      mounts: []
    };
    // create a root node for the fs
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      // set as a mountpoint
      node.mounted = mount;
      // add the new mount to the current mount's children
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, {
      follow_mount: false
    });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    // destroy the nodes for this mount, and all its child mounts
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    Object.keys(FS.nameTable).forEach(hash => {
      var current = FS.nameTable[hash];
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    });
    // no longer a mountpoint
    node.mounted = null;
    // remove this mount from the child mounts
    var idx = node.mount.mounts.indexOf(mount);
    assert(idx !== -1);
    node.mount.mounts.splice(idx, 1);
  },
  lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  create(path, mode) {
    mode = mode !== undefined ? mode : 438;
    /* 0666 */ mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir(path, mode) {
    mode = mode !== undefined ? mode : 511;
    /* 0777 */ mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree(path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue;
      d += "/" + dirs[i];
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev(path, mode, dev) {
    if (typeof dev == "undefined") {
      dev = mode;
      mode = 438;
    }
    /* 0666 */ mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    // parents must exist
    var lookup, old_dir, new_dir;
    // let the errors from non existent directories percolate up
    lookup = FS.lookupPath(old_path, {
      parent: true
    });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, {
      parent: true
    });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    // need to be part of the same mount
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    // source must exist
    var old_node = FS.lookupNode(old_dir, old_name);
    // old path should not be an ancestor of the new path
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    // new path should not be an ancestor of the old path
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    // see if the new path already exists
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    // early out if nothing needs to change
    if (old_node === new_node) {
      return;
    }
    // we'll need to delete the old entry
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    // need delete permissions if we'll be overwriting.
    // need create permissions if new doesn't already exist.
    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    // if we are going to change the parent, check write permissions
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    // remove the node from the lookup hash
    FS.hashRemoveNode(old_node);
    // do the underlying fs rename
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
      // update old node (we do this here to avoid each backend 
      // needing to)
      old_node.parent = new_dir;
    } catch (e) {
      throw e;
    } finally {
      // add the node back to the hash (in case node_ops.rename
      // changed its name)
      FS.hashAddNode(old_node);
    }
  },
  rmdir(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  },
  readdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54);
    }
    return node.node_ops.readdir(node);
  },
  unlink(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      // According to POSIX, we should map EISDIR to EPERM, but
      // we instead do what Linux does (and we must, as we use
      // the musl linux libc).
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  },
  readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
  },
  stat(path, dontFollow) {
    var lookup = FS.lookupPath(path, {
      follow: !dontFollow
    });
    var node = lookup.node;
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63);
    }
    return node.node_ops.getattr(node);
  },
  lstat(path) {
    return FS.stat(path, true);
  },
  chmod(path, mode, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      timestamp: Date.now()
    });
  },
  lchmod(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod(fd, mode) {
    var stream = FS.getStreamChecked(fd);
    FS.chmod(stream.node, mode);
  },
  chown(path, uid, gid, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, {
      timestamp: Date.now()
    });
  },
  // we ignore the uid / gid for now
  lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown(fd, uid, gid) {
    var stream = FS.getStreamChecked(fd);
    FS.chown(stream.node, uid, gid);
  },
  truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, {
        follow: true
      });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    node.node_ops.setattr(node, {
      size: len,
      timestamp: Date.now()
    });
  },
  ftruncate(fd, len) {
    var stream = FS.getStreamChecked(fd);
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.truncate(stream.node, len);
  },
  utime(path, atime, mtime) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    node.node_ops.setattr(node, {
      timestamp: Math.max(atime, mtime)
    });
  },
  open(path, flags, mode) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
    if ((flags & 64)) {
      mode = typeof mode == "undefined" ? 438 : /* 0666 */ mode;
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    if (typeof path == "object") {
      node = path;
    } else {
      path = PATH.normalize(path);
      try {
        var lookup = FS.lookupPath(path, {
          follow: !(flags & 131072)
        });
        node = lookup.node;
      } catch (e) {}
    }
    // perhaps we need to create the node
    var created = false;
    if ((flags & 64)) {
      if (node) {
        // if O_CREAT and O_EXCL are set, error out if the node already exists
        if ((flags & 128)) {
          throw new FS.ErrnoError(20);
        }
      } else {
        // node doesn't exist, try to create it
        node = FS.mknod(path, mode, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    // can't truncate a device
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    // if asked only for a directory, then this must be one
    if ((flags & 65536) && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    // check permissions, if this is not a file we just created now (it is ok to
    // create and write to a file with read-only permissions; it is read-only
    // for later use)
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    // do truncation if necessary
    if ((flags & 512) && !created) {
      FS.truncate(node, 0);
    }
    // we've already handled these, don't pass down to the underlying vfs
    flags &= ~(128 | 512 | 131072);
    // register the stream with the filesystem
    var stream = FS.createStream({
      node,
      path: FS.getPath(node),
      // we want the absolute path to the node
      flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      // used by the file family libc calls (fopen, fwrite, ferror, etc.)
      ungotten: [],
      error: false
    });
    // call the new stream's open function
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (Module["logReadFiles"] && !(flags & 1)) {
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
      }
    }
    return stream;
  },
  close(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    // free readdir state
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed(stream) {
    return stream.fd === null;
  },
  llseek(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read(stream, buffer, offset, length, position) {
    assert(offset >= 0);
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write(stream, buffer, offset, length, position, canOwn) {
    assert(offset >= 0);
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      // seek to the end before writing in append mode
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  allocate(stream, offset, length) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(28);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(138);
    }
    stream.stream_ops.allocate(stream, offset, length);
  },
  mmap(stream, length, position, prot, flags) {
    // User requests writing to file (prot & PROT_WRITE != 0).
    // Checking if we have permissions to write to the file unless
    // MAP_PRIVATE flag is set. According to POSIX spec it is possible
    // to write to file opened in read-only mode with MAP_PRIVATE flag,
    // as all modifications will be visible only in the memory of
    // the current process.
    if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    if (!length) {
      throw new FS.ErrnoError(28);
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags);
  },
  msync(stream, buffer, offset, length, mmapFlags) {
    assert(offset >= 0);
    if (!stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile(path, opts = {}) {
    opts.flags = opts.flags || 0;
    opts.encoding = opts.encoding || "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error(`Invalid encoding type "${opts.encoding}"`);
    }
    var ret;
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      ret = UTF8ArrayToString(buf);
    } else if (opts.encoding === "binary") {
      ret = buf;
    }
    FS.close(stream);
    return ret;
  },
  writeFile(path, data, opts = {}) {
    opts.flags = opts.flags || 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    if (typeof data == "string") {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
      FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
    } else if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    } else {
      throw new Error("Unsupported data type");
    }
    FS.close(stream);
  },
  cwd: () => FS.currentPath,
  chdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices() {
    // create /dev
    FS.mkdir("/dev");
    // setup /dev/null
    FS.registerDevice(FS.makedev(1, 3), {
      read: () => 0,
      write: (stream, buffer, offset, length, pos) => length
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    // setup /dev/tty and /dev/tty1
    // stderr needs to print output using err() rather than out()
    // so we register a second tty just for it.
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    // setup /dev/[u]random
    // use a buffer to avoid overhead of individual crypto calls per byte
    var randomBuffer = new Uint8Array(1024), randomLeft = 0;
    var randomByte = () => {
      if (randomLeft === 0) {
        randomLeft = randomFill(randomBuffer).byteLength;
      }
      return randomBuffer[--randomLeft];
    };
    FS.createDevice("/dev", "random", randomByte);
    FS.createDevice("/dev", "urandom", randomByte);
    // we're not going to emulate the actual shm device,
    // just create the tmp dirs that reside in it commonly
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories() {
    // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
    // name of the stream for fd 6 (see test_unistd_ttyname)
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount({
      mount() {
        var node = FS.createNode(proc_self, "fd", 16384 | 511, /* 0777 */ 73);
        node.node_ops = {
          lookup(parent, name) {
            var fd = +name;
            var stream = FS.getStreamChecked(fd);
            var ret = {
              parent: null,
              mount: {
                mountpoint: "fake"
              },
              node_ops: {
                readlink: () => stream.path
              }
            };
            ret.parent = ret;
            // make it look like a simple root node
            return ret;
          }
        };
        return node;
      }
    }, {}, "/proc/self/fd");
  },
  createStandardStreams(input, output, error) {
    // TODO deprecate the old functionality of a single
    // input / output callback and that utilizes FS.createDevice
    // and instead require a unique set of stream ops
    // by default, we symlink the standard streams to the
    // default tty devices. however, if the standard streams
    // have been overwritten we create a unique device for
    // them instead.
    if (input) {
      FS.createDevice("/dev", "stdin", input);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (output) {
      FS.createDevice("/dev", "stdout", null, output);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (error) {
      FS.createDevice("/dev", "stderr", null, error);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    // open default streams for the stdin, stdout and stderr devices
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
    assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
    assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
    assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
  },
  staticInit() {
    // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
    [ 44 ].forEach(code => {
      FS.genericErrors[code] = new FS.ErrnoError(code);
      FS.genericErrors[code].stack = "<generic error, no stack>";
    });
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = {
      "MEMFS": MEMFS
    };
  },
  init(input, output, error) {
    assert(!FS.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
    FS.initialized = true;
    // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
    input ??= Module["stdin"];
    output ??= Module["stdout"];
    error ??= Module["stderr"];
    FS.createStandardStreams(input, output, error);
  },
  quit() {
    FS.initialized = false;
    // force-flush all streams, so we get musl std streams printed out
    _fflush(0);
    // close all of our streams
    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i];
      if (!stream) {
        continue;
      }
      FS.close(stream);
    }
  },
  findObject(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (!ret.exists) {
      return null;
    }
    return ret.object;
  },
  analyzePath(path, dontResolveLastLink) {
    // operate from within the context of the symlink's target
    try {
      var lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    };
    try {
      var lookup = FS.lookupPath(path, {
        parent: true
      });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createPath(parent, path, canRead, canWrite) {
    parent = typeof parent == "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {}
      // ignore EEXIST
      parent = current;
    }
    return current;
  },
  createFile(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
    var path = name;
    if (parent) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      path = name ? PATH.join2(parent, name) : parent;
    }
    var mode = FS_getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      if (typeof data == "string") {
        var arr = new Array(data.length);
        for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
        data = arr;
      }
      // make sure we can write to the file
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
  },
  createDevice(parent, name, input, output) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(!!input, !!output);
    FS.createDevice.major ??= 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    // Create a fake device that a set of stream ops to emulate
    // the old behavior.
    FS.registerDevice(dev, {
      open(stream) {
        stream.seekable = false;
      },
      close(stream) {
        // flush any pending line data
        if (output?.buffer?.length) {
          output(10);
        }
      },
      read(stream, buffer, offset, length, pos) {
        /* ignored */ var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      },
      write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      }
    });
    return FS.mkdev(path, mode, dev);
  },
  forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (typeof XMLHttpRequest != "undefined") {
      throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      // Command-line.
      try {
        obj.contents = readBinary(obj.url);
        obj.usedBytes = obj.contents.length;
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    }
  },
  createLazyFile(parent, name, url, canRead, canWrite) {
    // Lazy chunked Uint8Array (implements get and length from Uint8Array).
    // Actual getting is abstracted away for eventual reuse.
    class LazyUint8Array {
      constructor() {
        this.lengthKnown = false;
        this.chunks = [];
      }
      // Loaded chunks. Index is the chunk number
      get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = (idx / this.chunkSize) | 0;
        return this.getter(chunkNum)[chunkOffset];
      }
      setDataGetter(getter) {
        this.getter = getter;
      }
      cacheLength() {
        // Find length
        var xhr = new XMLHttpRequest;
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        // Chunk size in bytes
        if (!hasByteServing) chunkSize = datalength;
        // Function to get a range from the remote URL.
        var doXHR = (from, to) => {
          if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
          if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
          // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, false);
          if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
          // Some hints to the browser that we want binary data.
          xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          if (xhr.response !== undefined) {
            return new Uint8Array(/** @type{Array<number>} */ (xhr.response || []));
          }
          return intArrayFromString(xhr.responseText || "", true);
        };
        var lazyArray = this;
        lazyArray.setDataGetter(chunkNum => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          // including this byte
          end = Math.min(end, datalength - 1);
          // if datalength-1 is selected, this is the last block
          if (typeof lazyArray.chunks[chunkNum] == "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
          chunkSize = datalength = 1;
          // this will force getter(0)/doXHR do download the whole file
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      }
      get length() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._length;
      }
      get chunkSize() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._chunkSize;
      }
    }
    if (typeof XMLHttpRequest != "undefined") {
      if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
      var lazyArray = new LazyUint8Array;
      var properties = {
        isDevice: false,
        contents: lazyArray
      };
    } else {
      var properties = {
        isDevice: false,
        url
      };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    // This is a total hack, but I want to get this lazy file code out of the
    // core of MEMFS. If we want to keep this lazy file concept I feel it should
    // be its own thin LAZYFS proxying calls to MEMFS.
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    // Add a function that defers querying the file size until it is asked the first time.
    Object.defineProperties(node, {
      usedBytes: {
        get: function() {
          return this.contents.length;
        }
      }
    });
    // override each stream op with one that tries to force load the lazy file first
    var stream_ops = {};
    var keys = Object.keys(node.stream_ops);
    keys.forEach(key => {
      var fn = node.stream_ops[key];
      stream_ops[key] = (...args) => {
        FS.forceLoadFile(node);
        return fn(...args);
      };
    });
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      assert(size >= 0);
      if (contents.slice) {
        // normal array
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          // LazyUint8Array from sync binary XHR
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    }
    // use a custom read function
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node);
      return writeChunks(stream, buffer, offset, length, position);
    };
    // use a custom mmap function
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node);
      var ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      writeChunks(stream, HEAP8, ptr, length, position);
      return {
        ptr,
        allocated: true
      };
    };
    node.stream_ops = stream_ops;
    return node;
  },
  absolutePath() {
    abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
  },
  createFolder() {
    abort("FS.createFolder has been removed; use FS.mkdir instead");
  },
  createLink() {
    abort("FS.createLink has been removed; use FS.symlink instead");
  },
  joinPath() {
    abort("FS.joinPath has been removed; use PATH.join instead");
  },
  mmapAlloc() {
    abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
  },
  standardizePath() {
    abort("FS.standardizePath has been removed; use PATH.normalize instead");
  }
};

var SYSCALLS = {
  DEFAULT_POLLMASK: 5,
  calculateAt(dirfd, path, allowEmpty) {
    if (PATH.isAbs(path)) {
      return path;
    }
    // relative path
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return PATH.join2(dir, path);
  },
  doStat(func, path, buf) {
    var stat = func(path);
    HEAP32[((buf) >>> 2) >>> 0] = stat.dev;
    HEAP32[(((buf) + (4)) >>> 2) >>> 0] = stat.mode;
    HEAPU32[(((buf) + (8)) >>> 2) >>> 0] = stat.nlink;
    HEAP32[(((buf) + (12)) >>> 2) >>> 0] = stat.uid;
    HEAP32[(((buf) + (16)) >>> 2) >>> 0] = stat.gid;
    HEAP32[(((buf) + (20)) >>> 2) >>> 0] = stat.rdev;
    HEAP64[(((buf) + (24)) >>> 3)] = BigInt(stat.size);
    HEAP32[(((buf) + (32)) >>> 2) >>> 0] = 4096;
    HEAP32[(((buf) + (36)) >>> 2) >>> 0] = stat.blocks;
    var atime = stat.atime.getTime();
    var mtime = stat.mtime.getTime();
    var ctime = stat.ctime.getTime();
    HEAP64[(((buf) + (40)) >>> 3)] = BigInt(Math.floor(atime / 1e3));
    HEAPU32[(((buf) + (48)) >>> 2) >>> 0] = (atime % 1e3) * 1e3 * 1e3;
    HEAP64[(((buf) + (56)) >>> 3)] = BigInt(Math.floor(mtime / 1e3));
    HEAPU32[(((buf) + (64)) >>> 2) >>> 0] = (mtime % 1e3) * 1e3 * 1e3;
    HEAP64[(((buf) + (72)) >>> 3)] = BigInt(Math.floor(ctime / 1e3));
    HEAPU32[(((buf) + (80)) >>> 2) >>> 0] = (ctime % 1e3) * 1e3 * 1e3;
    HEAP64[(((buf) + (88)) >>> 3)] = BigInt(stat.ino);
    return 0;
  },
  doMsync(addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (flags & 2) {
      // MAP_PRIVATE calls need not to be synced back to underlying fs
      return 0;
    }
    var buffer = HEAPU8.slice(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  },
  getStreamFromFD(fd) {
    var stream = FS.getStreamChecked(fd);
    return stream;
  },
  varargs: undefined,
  getStr(ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  }
};

function ___syscall_chmod(path, mode) {
  path >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    FS.chmod(path, mode);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_faccessat(dirfd, path, amode, flags) {
  path >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    assert(flags === 0 || flags == 512);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (amode & ~7) {
      // need a valid mode
      return -28;
    }
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    if (!node) {
      return -44;
    }
    var perms = "";
    if (amode & 4) perms += "r";
    if (amode & 2) perms += "w";
    if (amode & 1) perms += "x";
    if (perms && /* otherwise, they've just passed F_OK */ FS.nodePermissions(node, perms)) {
      return -2;
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fchmod(fd, mode) {
  try {
    FS.fchmod(fd, mode);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

/** @suppress {duplicate } */ function syscallGetVarargI() {
  assert(SYSCALLS.varargs != undefined);
  // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
  var ret = HEAP32[((+SYSCALLS.varargs) >>> 2) >>> 0];
  SYSCALLS.varargs += 4;
  return ret;
}

var syscallGetVarargP = syscallGetVarargI;

function ___syscall_fcntl64(fd, cmd, varargs) {
  varargs >>>= 0;
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (cmd) {
     case 0:
      {
        var arg = syscallGetVarargI();
        if (arg < 0) {
          return -28;
        }
        while (FS.streams[arg]) {
          arg++;
        }
        var newStream;
        newStream = FS.dupStream(stream, arg);
        return newStream.fd;
      }

     case 1:
     case 2:
      return 0;

     // FD_CLOEXEC makes no sense for a single process.
      case 3:
      return stream.flags;

     case 4:
      {
        var arg = syscallGetVarargI();
        stream.flags |= arg;
        return 0;
      }

     case 12:
      {
        var arg = syscallGetVarargP();
        var offset = 0;
        // We're always unlocked.
        HEAP16[(((arg) + (offset)) >>> 1) >>> 0] = 2;
        return 0;
      }

     case 13:
     case 14:
      return 0;
    }
    // Pretend that the locking is successful.
    return -28;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fstat64(fd, buf) {
  buf >>>= 0;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    return SYSCALLS.doStat(FS.stat, stream.path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_ftruncate64(fd, length) {
  length = bigintToI53Checked(length);
  try {
    if (isNaN(length)) return 61;
    FS.ftruncate(fd, length);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
  assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

function ___syscall_getcwd(buf, size) {
  buf >>>= 0;
  size >>>= 0;
  try {
    if (size === 0) return -28;
    var cwd = FS.cwd();
    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
    if (size < cwdLengthInBytes) return -68;
    stringToUTF8(cwd, buf, size);
    return cwdLengthInBytes;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_getdents64(fd, dirp, count) {
  dirp >>>= 0;
  count >>>= 0;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    stream.getdents ||= FS.readdir(stream.path);
    var struct_size = 280;
    var pos = 0;
    var off = FS.llseek(stream, 0, 1);
    var idx = Math.floor(off / struct_size);
    while (idx < stream.getdents.length && pos + struct_size <= count) {
      var id;
      var type;
      var name = stream.getdents[idx];
      if (name === ".") {
        id = stream.node.id;
        type = 4;
      } else // DT_DIR
      if (name === "..") {
        var lookup = FS.lookupPath(stream.path, {
          parent: true
        });
        id = lookup.node.id;
        type = 4;
      } else // DT_DIR
      {
        var child = FS.lookupNode(stream.node, name);
        id = child.id;
        type = FS.isChrdev(child.mode) ? 2 : // DT_CHR, character device.
        FS.isDir(child.mode) ? 4 : // DT_DIR, directory.
        FS.isLink(child.mode) ? 10 : // DT_LNK, symbolic link.
        8;
      }
      // DT_REG, regular file.
      assert(id);
      HEAP64[((dirp + pos) >>> 3)] = BigInt(id);
      HEAP64[(((dirp + pos) + (8)) >>> 3)] = BigInt((idx + 1) * struct_size);
      HEAP16[(((dirp + pos) + (16)) >>> 1) >>> 0] = 280;
      HEAP8[(dirp + pos) + (18) >>> 0] = type;
      stringToUTF8(name, dirp + pos + 19, 256);
      pos += struct_size;
      idx += 1;
    }
    FS.llseek(stream, idx * struct_size, 0);
    return pos;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_ioctl(fd, op, varargs) {
  varargs >>>= 0;
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (op) {
     case 21509:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     case 21505:
      {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcgets) {
          var termios = stream.tty.ops.ioctl_tcgets(stream);
          var argp = syscallGetVarargP();
          HEAP32[((argp) >>> 2) >>> 0] = termios.c_iflag || 0;
          HEAP32[(((argp) + (4)) >>> 2) >>> 0] = termios.c_oflag || 0;
          HEAP32[(((argp) + (8)) >>> 2) >>> 0] = termios.c_cflag || 0;
          HEAP32[(((argp) + (12)) >>> 2) >>> 0] = termios.c_lflag || 0;
          for (var i = 0; i < 32; i++) {
            HEAP8[(argp + i) + (17) >>> 0] = termios.c_cc[i] || 0;
          }
          return 0;
        }
        return 0;
      }

     case 21510:
     case 21511:
     case 21512:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     // no-op, not actually adjusting terminal settings
      case 21506:
     case 21507:
     case 21508:
      {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcsets) {
          var argp = syscallGetVarargP();
          var c_iflag = HEAP32[((argp) >>> 2) >>> 0];
          var c_oflag = HEAP32[(((argp) + (4)) >>> 2) >>> 0];
          var c_cflag = HEAP32[(((argp) + (8)) >>> 2) >>> 0];
          var c_lflag = HEAP32[(((argp) + (12)) >>> 2) >>> 0];
          var c_cc = [];
          for (var i = 0; i < 32; i++) {
            c_cc.push(HEAP8[(argp + i) + (17) >>> 0]);
          }
          return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
            c_iflag,
            c_oflag,
            c_cflag,
            c_lflag,
            c_cc
          });
        }
        return 0;
      }

     // no-op, not actually adjusting terminal settings
      case 21519:
      {
        if (!stream.tty) return -59;
        var argp = syscallGetVarargP();
        HEAP32[((argp) >>> 2) >>> 0] = 0;
        return 0;
      }

     case 21520:
      {
        if (!stream.tty) return -59;
        return -28;
      }

     // not supported
      case 21531:
      {
        var argp = syscallGetVarargP();
        return FS.ioctl(stream, op, argp);
      }

     case 21523:
      {
        // TODO: in theory we should write to the winsize struct that gets
        // passed in, but for now musl doesn't read anything on it
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tiocgwinsz) {
          var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
          var argp = syscallGetVarargP();
          HEAP16[((argp) >>> 1) >>> 0] = winsize[0];
          HEAP16[(((argp) + (2)) >>> 1) >>> 0] = winsize[1];
        }
        return 0;
      }

     case 21524:
      {
        // TODO: technically, this ioctl call should change the window size.
        // but, since emscripten doesn't have any concept of a terminal window
        // yet, we'll just silently throw it away as we do TIOCGWINSZ
        if (!stream.tty) return -59;
        return 0;
      }

     case 21515:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     default:
      return -28;
    }
  } // not supported
  catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_lstat64(path, buf) {
  path >>>= 0;
  buf >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.doStat(FS.lstat, path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_mkdirat(dirfd, path, mode) {
  path >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    // remove a trailing slash, if one - /a/b/ has basename of '', but
    // we want to create b in the context of this function
    path = PATH.normalize(path);
    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
    FS.mkdir(path, mode, 0);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
  path >>>= 0;
  buf >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    var nofollow = flags & 256;
    var allowEmpty = flags & 4096;
    flags = flags & (~6400);
    assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
    return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
  path >>>= 0;
  varargs >>>= 0;
  SYSCALLS.varargs = varargs;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    var mode = varargs ? syscallGetVarargI() : 0;
    return FS.open(path, flags, mode).fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
  path >>>= 0;
  buf >>>= 0;
  bufsize >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (bufsize <= 0) return -28;
    var ret = FS.readlink(path);
    var len = Math.min(bufsize, lengthBytesUTF8(ret));
    var endChar = HEAP8[buf + len >>> 0];
    stringToUTF8(ret, buf, bufsize + 1);
    // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
    // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
    HEAP8[buf + len >>> 0] = endChar;
    return len;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
  oldpath >>>= 0;
  newpath >>>= 0;
  try {
    oldpath = SYSCALLS.getStr(oldpath);
    newpath = SYSCALLS.getStr(newpath);
    oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
    newpath = SYSCALLS.calculateAt(newdirfd, newpath);
    FS.rename(oldpath, newpath);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_rmdir(path) {
  path >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    FS.rmdir(path);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_stat64(path, buf) {
  path >>>= 0;
  buf >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.doStat(FS.stat, path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_symlink(target, linkpath) {
  target >>>= 0;
  linkpath >>>= 0;
  try {
    target = SYSCALLS.getStr(target);
    linkpath = SYSCALLS.getStr(linkpath);
    FS.symlink(target, linkpath);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_truncate64(path, length) {
  path >>>= 0;
  length = bigintToI53Checked(length);
  try {
    if (isNaN(length)) return 61;
    path = SYSCALLS.getStr(path);
    FS.truncate(path, length);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_unlinkat(dirfd, path, flags) {
  path >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (flags === 0) {
      FS.unlink(path);
    } else if (flags === 512) {
      FS.rmdir(path);
    } else {
      abort("Invalid flags passed to unlinkat");
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var readI53FromI64 = ptr => HEAPU32[((ptr) >>> 2) >>> 0] + HEAP32[(((ptr) + (4)) >>> 2) >>> 0] * 4294967296;

function ___syscall_utimensat(dirfd, path, times, flags) {
  path >>>= 0;
  times >>>= 0;
  try {
    path = SYSCALLS.getStr(path);
    assert(flags === 0);
    path = SYSCALLS.calculateAt(dirfd, path, true);
    var now = Date.now(), atime, mtime;
    if (!times) {
      atime = now;
      mtime = now;
    } else {
      var seconds = readI53FromI64(times);
      var nanoseconds = HEAP32[(((times) + (8)) >>> 2) >>> 0];
      if (nanoseconds == 1073741823) {
        atime = now;
      } else if (nanoseconds == 1073741822) {
        atime = -1;
      } else {
        atime = (seconds * 1e3) + (nanoseconds / (1e3 * 1e3));
      }
      times += 16;
      seconds = readI53FromI64(times);
      nanoseconds = HEAP32[(((times) + (8)) >>> 2) >>> 0];
      if (nanoseconds == 1073741823) {
        mtime = now;
      } else if (nanoseconds == 1073741822) {
        mtime = -1;
      } else {
        mtime = (seconds * 1e3) + (nanoseconds / (1e3 * 1e3));
      }
    }
    // -1 here means UTIME_OMIT was passed.  FS.utime tables the max of these
    // two values and sets the timestamp to that single value.  If both were
    // set to UTIME_OMIT then we can skip the call completely.
    if (mtime != -1 || atime != -1) {
      FS.utime(path, atime, mtime);
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var __abort_js = () => {
  abort("native code called abort()");
};

var embindRepr = v => {
  if (v === null) {
    return "null";
  }
  var t = typeof v;
  if (t === "object" || t === "array" || t === "function") {
    return v.toString();
  } else {
    return "" + v;
  }
};

var embind_init_charCodes = () => {
  var codes = new Array(256);
  for (var i = 0; i < 256; ++i) {
    codes[i] = String.fromCharCode(i);
  }
  embind_charCodes = codes;
};

var embind_charCodes;

var readLatin1String = ptr => {
  var ret = "";
  var c = ptr;
  while (HEAPU8[c >>> 0]) {
    ret += embind_charCodes[HEAPU8[c++ >>> 0]];
  }
  return ret;
};

var awaitingDependencies = {};

var registeredTypes = {};

var typeDependencies = {};

var BindingError;

var throwBindingError = message => {
  throw new BindingError(message);
};

var InternalError;

var throwInternalError = message => {
  throw new InternalError(message);
};

var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
  myTypes.forEach(type => typeDependencies[type] = dependentTypes);
  function onComplete(typeConverters) {
    var myTypeConverters = getTypeConverters(typeConverters);
    if (myTypeConverters.length !== myTypes.length) {
      throwInternalError("Mismatched type converter count");
    }
    for (var i = 0; i < myTypes.length; ++i) {
      registerType(myTypes[i], myTypeConverters[i]);
    }
  }
  var typeConverters = new Array(dependentTypes.length);
  var unregisteredTypes = [];
  var registered = 0;
  dependentTypes.forEach((dt, i) => {
    if (registeredTypes.hasOwnProperty(dt)) {
      typeConverters[i] = registeredTypes[dt];
    } else {
      unregisteredTypes.push(dt);
      if (!awaitingDependencies.hasOwnProperty(dt)) {
        awaitingDependencies[dt] = [];
      }
      awaitingDependencies[dt].push(() => {
        typeConverters[i] = registeredTypes[dt];
        ++registered;
        if (registered === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      });
    }
  });
  if (0 === unregisteredTypes.length) {
    onComplete(typeConverters);
  }
};

/** @param {Object=} options */ function sharedRegisterType(rawType, registeredInstance, options = {}) {
  var name = registeredInstance.name;
  if (!rawType) {
    throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
  }
  if (registeredTypes.hasOwnProperty(rawType)) {
    if (options.ignoreDuplicateRegistrations) {
      return;
    } else {
      throwBindingError(`Cannot register type '${name}' twice`);
    }
  }
  registeredTypes[rawType] = registeredInstance;
  delete typeDependencies[rawType];
  if (awaitingDependencies.hasOwnProperty(rawType)) {
    var callbacks = awaitingDependencies[rawType];
    delete awaitingDependencies[rawType];
    callbacks.forEach(cb => cb());
  }
}

/** @param {Object=} options */ function registerType(rawType, registeredInstance, options = {}) {
  if (registeredInstance.argPackAdvance === undefined) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  return sharedRegisterType(rawType, registeredInstance, options);
}

var integerReadValueFromPointer = (name, width, signed) => {
  // integers are quite common, so generate very specialized functions
  switch (width) {
   case 1:
    return signed ? pointer => HEAP8[pointer >>> 0] : pointer => HEAPU8[pointer >>> 0];

   case 2:
    return signed ? pointer => HEAP16[((pointer) >>> 1) >>> 0] : pointer => HEAPU16[((pointer) >>> 1) >>> 0];

   case 4:
    return signed ? pointer => HEAP32[((pointer) >>> 2) >>> 0] : pointer => HEAPU32[((pointer) >>> 2) >>> 0];

   case 8:
    return signed ? pointer => HEAP64[((pointer) >>> 3)] : pointer => HEAPU64[((pointer) >>> 3)];

   default:
    throw new TypeError(`invalid integer width (${width}): ${name}`);
  }
};

/** @suppress {globalThis} */ function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {
  primitiveType >>>= 0;
  name >>>= 0;
  size >>>= 0;
  name = readLatin1String(name);
  var isUnsignedType = (name.indexOf("u") != -1);
  // maxRange comes through as -1 for uint64_t (see issue 13902). Work around that temporarily
  if (isUnsignedType) {
    maxRange = (1n << 64n) - 1n;
  }
  registerType(primitiveType, {
    name,
    "fromWireType": value => value,
    "toWireType": function(destructors, value) {
      if (typeof value != "bigint" && typeof value != "number") {
        throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${this.name}`);
      }
      if (typeof value == "number") {
        value = BigInt(value);
      }
      if (value < minRange || value > maxRange) {
        throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
      }
      return value;
    },
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": integerReadValueFromPointer(name, size, !isUnsignedType),
    destructorFunction: null
  });
}

var GenericWireTypeSize = 8;

/** @suppress {globalThis} */ function __embind_register_bool(rawType, name, trueValue, falseValue) {
  rawType >>>= 0;
  name >>>= 0;
  name = readLatin1String(name);
  registerType(rawType, {
    name,
    "fromWireType": function(wt) {
      // ambiguous emscripten ABI: sometimes return values are
      // true or false, and sometimes integers (0 or 1)
      return !!wt;
    },
    "toWireType": function(destructors, o) {
      return o ? trueValue : falseValue;
    },
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": function(pointer) {
      return this["fromWireType"](HEAPU8[pointer >>> 0]);
    },
    destructorFunction: null
  });
}

var shallowCopyInternalPointer = o => ({
  count: o.count,
  deleteScheduled: o.deleteScheduled,
  preservePointerOnDelete: o.preservePointerOnDelete,
  ptr: o.ptr,
  ptrType: o.ptrType,
  smartPtr: o.smartPtr,
  smartPtrType: o.smartPtrType
});

var throwInstanceAlreadyDeleted = obj => {
  function getInstanceTypeName(handle) {
    return handle.$$.ptrType.registeredClass.name;
  }
  throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
};

var finalizationRegistry = false;

var detachFinalizer = handle => {};

var runDestructor = $$ => {
  if ($$.smartPtr) {
    $$.smartPtrType.rawDestructor($$.smartPtr);
  } else {
    $$.ptrType.registeredClass.rawDestructor($$.ptr);
  }
};

var releaseClassHandle = $$ => {
  $$.count.value -= 1;
  var toDelete = 0 === $$.count.value;
  if (toDelete) {
    runDestructor($$);
  }
};

var downcastPointer = (ptr, ptrClass, desiredClass) => {
  if (ptrClass === desiredClass) {
    return ptr;
  }
  if (undefined === desiredClass.baseClass) {
    return null;
  }
  // no conversion
  var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
  if (rv === null) {
    return null;
  }
  return desiredClass.downcast(rv);
};

var registeredPointers = {};

var registeredInstances = {};

var getBasestPointer = (class_, ptr) => {
  if (ptr === undefined) {
    throwBindingError("ptr should not be undefined");
  }
  while (class_.baseClass) {
    ptr = class_.upcast(ptr);
    class_ = class_.baseClass;
  }
  return ptr;
};

var getInheritedInstance = (class_, ptr) => {
  ptr = getBasestPointer(class_, ptr);
  return registeredInstances[ptr];
};

var makeClassHandle = (prototype, record) => {
  if (!record.ptrType || !record.ptr) {
    throwInternalError("makeClassHandle requires ptr and ptrType");
  }
  var hasSmartPtrType = !!record.smartPtrType;
  var hasSmartPtr = !!record.smartPtr;
  if (hasSmartPtrType !== hasSmartPtr) {
    throwInternalError("Both smartPtrType and smartPtr must be specified");
  }
  record.count = {
    value: 1
  };
  return attachFinalizer(Object.create(prototype, {
    $$: {
      value: record,
      writable: true
    }
  }));
};

/** @suppress {globalThis} */ function RegisteredPointer_fromWireType(ptr) {
  // ptr is a raw pointer (or a raw smartpointer)
  // rawPointer is a maybe-null raw pointer
  var rawPointer = this.getPointee(ptr);
  if (!rawPointer) {
    this.destructor(ptr);
    return null;
  }
  var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
  if (undefined !== registeredInstance) {
    // JS object has been neutered, time to repopulate it
    if (0 === registeredInstance.$$.count.value) {
      registeredInstance.$$.ptr = rawPointer;
      registeredInstance.$$.smartPtr = ptr;
      return registeredInstance["clone"]();
    } else {
      // else, just increment reference count on existing object
      // it already has a reference to the smart pointer
      var rv = registeredInstance["clone"]();
      this.destructor(ptr);
      return rv;
    }
  }
  function makeDefaultHandle() {
    if (this.isSmartPointer) {
      return makeClassHandle(this.registeredClass.instancePrototype, {
        ptrType: this.pointeeType,
        ptr: rawPointer,
        smartPtrType: this,
        smartPtr: ptr
      });
    } else {
      return makeClassHandle(this.registeredClass.instancePrototype, {
        ptrType: this,
        ptr
      });
    }
  }
  var actualType = this.registeredClass.getActualType(rawPointer);
  var registeredPointerRecord = registeredPointers[actualType];
  if (!registeredPointerRecord) {
    return makeDefaultHandle.call(this);
  }
  var toType;
  if (this.isConst) {
    toType = registeredPointerRecord.constPointerType;
  } else {
    toType = registeredPointerRecord.pointerType;
  }
  var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
  if (dp === null) {
    return makeDefaultHandle.call(this);
  }
  if (this.isSmartPointer) {
    return makeClassHandle(toType.registeredClass.instancePrototype, {
      ptrType: toType,
      ptr: dp,
      smartPtrType: this,
      smartPtr: ptr
    });
  } else {
    return makeClassHandle(toType.registeredClass.instancePrototype, {
      ptrType: toType,
      ptr: dp
    });
  }
}

var attachFinalizer = handle => {
  if ("undefined" === typeof FinalizationRegistry) {
    attachFinalizer = handle => handle;
    return handle;
  }
  // If the running environment has a FinalizationRegistry (see
  // https://github.com/tc39/proposal-weakrefs), then attach finalizers
  // for class handles.  We check for the presence of FinalizationRegistry
  // at run-time, not build-time.
  finalizationRegistry = new FinalizationRegistry(info => {
    console.warn(info.leakWarning);
    releaseClassHandle(info.$$);
  });
  attachFinalizer = handle => {
    var $$ = handle.$$;
    var hasSmartPtr = !!$$.smartPtr;
    if (hasSmartPtr) {
      // We should not call the destructor on raw pointers in case other code expects the pointee to live
      var info = {
        $$
      };
      // Create a warning as an Error instance in advance so that we can store
      // the current stacktrace and point to it when / if a leak is detected.
      // This is more useful than the empty stacktrace of `FinalizationRegistry`
      // callback.
      var cls = $$.ptrType.registeredClass;
      var err = new Error(`Embind found a leaked C++ instance ${cls.name} <${ptrToString($$.ptr)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\n" + "Make sure to invoke .delete() manually once you're done with the instance instead.\n" + "Originally allocated");
      // `.stack` will add "at ..." after this sentence
      if ("captureStackTrace" in Error) {
        Error.captureStackTrace(err, RegisteredPointer_fromWireType);
      }
      info.leakWarning = err.stack.replace(/^Error: /, "");
      finalizationRegistry.register(handle, info, handle);
    }
    return handle;
  };
  detachFinalizer = handle => finalizationRegistry.unregister(handle);
  return attachFinalizer(handle);
};

var deletionQueue = [];

var flushPendingDeletes = () => {
  while (deletionQueue.length) {
    var obj = deletionQueue.pop();
    obj.$$.deleteScheduled = false;
    obj["delete"]();
  }
};

var delayFunction;

var init_ClassHandle = () => {
  Object.assign(ClassHandle.prototype, {
    "isAliasOf"(other) {
      if (!(this instanceof ClassHandle)) {
        return false;
      }
      if (!(other instanceof ClassHandle)) {
        return false;
      }
      var leftClass = this.$$.ptrType.registeredClass;
      var left = this.$$.ptr;
      other.$$ = /** @type {Object} */ (other.$$);
      var rightClass = other.$$.ptrType.registeredClass;
      var right = other.$$.ptr;
      while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass;
      }
      while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass;
      }
      return leftClass === rightClass && left === right;
    },
    "clone"() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this;
      } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
          $$: {
            value: shallowCopyInternalPointer(this.$$)
          }
        }));
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone;
      }
    },
    "delete"() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion");
      }
      detachFinalizer(this);
      releaseClassHandle(this.$$);
      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = undefined;
        this.$$.ptr = undefined;
      }
    },
    "isDeleted"() {
      return !this.$$.ptr;
    },
    "deleteLater"() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion");
      }
      deletionQueue.push(this);
      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
      this.$$.deleteScheduled = true;
      return this;
    }
  });
};

/** @constructor */ function ClassHandle() {}

var createNamedFunction = (name, body) => Object.defineProperty(body, "name", {
  value: name
});

var ensureOverloadTable = (proto, methodName, humanName) => {
  if (undefined === proto[methodName].overloadTable) {
    var prevFunc = proto[methodName];
    // Inject an overload resolver function that routes to the appropriate overload based on the number of arguments.
    proto[methodName] = function(...args) {
      // TODO This check can be removed in -O3 level "unsafe" optimizations.
      if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
        throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
      }
      return proto[methodName].overloadTable[args.length].apply(this, args);
    };
    // Move the previous function into the overload table.
    proto[methodName].overloadTable = [];
    proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
  }
};

/** @param {number=} numArguments */ var exposePublicSymbol = (name, value, numArguments) => {
  if (Module.hasOwnProperty(name)) {
    if (undefined === numArguments || (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])) {
      throwBindingError(`Cannot register public name '${name}' twice`);
    }
    // We are exposing a function with the same name as an existing function. Create an overload table and a function selector
    // that routes between the two.
    ensureOverloadTable(Module, name, name);
    if (Module[name].overloadTable.hasOwnProperty(numArguments)) {
      throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
    }
    // Add the new function into the overload table.
    Module[name].overloadTable[numArguments] = value;
  } else {
    Module[name] = value;
    Module[name].argCount = numArguments;
  }
};

var char_0 = 48;

var char_9 = 57;

var makeLegalFunctionName = name => {
  assert(typeof name === "string");
  name = name.replace(/[^a-zA-Z0-9_]/g, "$");
  var f = name.charCodeAt(0);
  if (f >= char_0 && f <= char_9) {
    return `_${name}`;
  }
  return name;
};

/** @constructor */ function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
  this.name = name;
  this.constructor = constructor;
  this.instancePrototype = instancePrototype;
  this.rawDestructor = rawDestructor;
  this.baseClass = baseClass;
  this.getActualType = getActualType;
  this.upcast = upcast;
  this.downcast = downcast;
  this.pureVirtualFunctions = [];
}

var upcastPointer = (ptr, ptrClass, desiredClass) => {
  while (ptrClass !== desiredClass) {
    if (!ptrClass.upcast) {
      throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
    }
    ptr = ptrClass.upcast(ptr);
    ptrClass = ptrClass.baseClass;
  }
  return ptr;
};

/** @suppress {globalThis} */ function constNoSmartPtrRawPointerToWireType(destructors, handle) {
  if (handle === null) {
    if (this.isReference) {
      throwBindingError(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!handle.$$) {
    throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
  }
  if (!handle.$$.ptr) {
    throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  var handleClass = handle.$$.ptrType.registeredClass;
  var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
  return ptr;
}

/** @suppress {globalThis} */ function genericPointerToWireType(destructors, handle) {
  var ptr;
  if (handle === null) {
    if (this.isReference) {
      throwBindingError(`null is not a valid ${this.name}`);
    }
    if (this.isSmartPointer) {
      ptr = this.rawConstructor();
      if (destructors !== null) {
        destructors.push(this.rawDestructor, ptr);
      }
      return ptr;
    } else {
      return 0;
    }
  }
  if (!handle || !handle.$$) {
    throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
  }
  if (!handle.$$.ptr) {
    throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.isConst && handle.$$.ptrType.isConst) {
    throwBindingError(`Cannot convert argument of type ${(handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name)} to parameter type ${this.name}`);
  }
  var handleClass = handle.$$.ptrType.registeredClass;
  ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
  if (this.isSmartPointer) {
    // TODO: this is not strictly true
    // We could support BY_EMVAL conversions from raw pointers to smart pointers
    // because the smart pointer can hold a reference to the handle
    if (undefined === handle.$$.smartPtr) {
      throwBindingError("Passing raw pointer to smart pointer is illegal");
    }
    switch (this.sharingPolicy) {
     case 0:
      // NONE
      // no upcasting
      if (handle.$$.smartPtrType === this) {
        ptr = handle.$$.smartPtr;
      } else {
        throwBindingError(`Cannot convert argument of type ${(handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name)} to parameter type ${this.name}`);
      }
      break;

     case 1:
      // INTRUSIVE
      ptr = handle.$$.smartPtr;
      break;

     case 2:
      // BY_EMVAL
      if (handle.$$.smartPtrType === this) {
        ptr = handle.$$.smartPtr;
      } else {
        var clonedHandle = handle["clone"]();
        ptr = this.rawShare(ptr, Emval.toHandle(() => clonedHandle["delete"]()));
        if (destructors !== null) {
          destructors.push(this.rawDestructor, ptr);
        }
      }
      break;

     default:
      throwBindingError("Unsupporting sharing policy");
    }
  }
  return ptr;
}

/** @suppress {globalThis} */ function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
  if (handle === null) {
    if (this.isReference) {
      throwBindingError(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!handle.$$) {
    throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
  }
  if (!handle.$$.ptr) {
    throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (handle.$$.ptrType.isConst) {
    throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
  }
  var handleClass = handle.$$.ptrType.registeredClass;
  var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
  return ptr;
}

/** @suppress {globalThis} */ function readPointer(pointer) {
  return this["fromWireType"](HEAPU32[((pointer) >>> 2) >>> 0]);
}

var init_RegisteredPointer = () => {
  Object.assign(RegisteredPointer.prototype, {
    getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr);
      }
      return ptr;
    },
    destructor(ptr) {
      this.rawDestructor?.(ptr);
    },
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": readPointer,
    "fromWireType": RegisteredPointer_fromWireType
  });
};

/** @constructor
      @param {*=} pointeeType,
      @param {*=} sharingPolicy,
      @param {*=} rawGetPointee,
      @param {*=} rawConstructor,
      @param {*=} rawShare,
      @param {*=} rawDestructor,
       */ function RegisteredPointer(name, registeredClass, isReference, isConst, // smart pointer properties
isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
  this.name = name;
  this.registeredClass = registeredClass;
  this.isReference = isReference;
  this.isConst = isConst;
  // smart pointer properties
  this.isSmartPointer = isSmartPointer;
  this.pointeeType = pointeeType;
  this.sharingPolicy = sharingPolicy;
  this.rawGetPointee = rawGetPointee;
  this.rawConstructor = rawConstructor;
  this.rawShare = rawShare;
  this.rawDestructor = rawDestructor;
  if (!isSmartPointer && registeredClass.baseClass === undefined) {
    if (isConst) {
      this["toWireType"] = constNoSmartPtrRawPointerToWireType;
      this.destructorFunction = null;
    } else {
      this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
      this.destructorFunction = null;
    }
  } else {
    this["toWireType"] = genericPointerToWireType;
  }
}

/** @param {number=} numArguments */ var replacePublicSymbol = (name, value, numArguments) => {
  if (!Module.hasOwnProperty(name)) {
    throwInternalError("Replacing nonexistent public symbol");
  }
  // If there's an overload table for this symbol, replace the symbol in the overload table instead.
  if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
    Module[name].overloadTable[numArguments] = value;
  } else {
    Module[name] = value;
    Module[name].argCount = numArguments;
  }
};

var dynCall = (sig, ptr, args = []) => {
  assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
  var rtn = getWasmTableEntry(ptr)(...args);
  return sig[0] == "p" ? rtn >>> 0 : rtn;
};

var getDynCaller = (sig, ptr) => {
  assert(sig.includes("j") || sig.includes("p"), "getDynCaller should only be called with i64 sigs");
  return (...args) => dynCall(sig, ptr, args);
};

var embind__requireFunction = (signature, rawFunction) => {
  signature = readLatin1String(signature);
  function makeDynCaller() {
    if (signature.includes("p")) {
      return getDynCaller(signature, rawFunction);
    }
    return getWasmTableEntry(rawFunction);
  }
  var fp = makeDynCaller();
  if (typeof fp != "function") {
    throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
  }
  return fp;
};

var extendError = (baseErrorType, errorName) => {
  var errorClass = createNamedFunction(errorName, function(message) {
    this.name = errorName;
    this.message = message;
    var stack = (new Error(message)).stack;
    if (stack !== undefined) {
      this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
    }
  });
  errorClass.prototype = Object.create(baseErrorType.prototype);
  errorClass.prototype.constructor = errorClass;
  errorClass.prototype.toString = function() {
    if (this.message === undefined) {
      return this.name;
    } else {
      return `${this.name}: ${this.message}`;
    }
  };
  return errorClass;
};

var UnboundTypeError;

var getTypeName = type => {
  var ptr = ___getTypeName(type);
  var rv = readLatin1String(ptr);
  _free(ptr);
  return rv;
};

var throwUnboundTypeError = (message, types) => {
  var unboundTypes = [];
  var seen = {};
  function visit(type) {
    if (seen[type]) {
      return;
    }
    if (registeredTypes[type]) {
      return;
    }
    if (typeDependencies[type]) {
      typeDependencies[type].forEach(visit);
      return;
    }
    unboundTypes.push(type);
    seen[type] = true;
  }
  types.forEach(visit);
  throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([ ", " ]));
};

function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
  rawType >>>= 0;
  rawPointerType >>>= 0;
  rawConstPointerType >>>= 0;
  baseClassRawType >>>= 0;
  getActualTypeSignature >>>= 0;
  getActualType >>>= 0;
  upcastSignature >>>= 0;
  upcast >>>= 0;
  downcastSignature >>>= 0;
  downcast >>>= 0;
  name >>>= 0;
  destructorSignature >>>= 0;
  rawDestructor >>>= 0;
  name = readLatin1String(name);
  getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
  upcast &&= embind__requireFunction(upcastSignature, upcast);
  downcast &&= embind__requireFunction(downcastSignature, downcast);
  rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
  var legalFunctionName = makeLegalFunctionName(name);
  exposePublicSymbol(legalFunctionName, function() {
    // this code cannot run if baseClassRawType is zero
    throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [ baseClassRawType ]);
  });
  whenDependentTypesAreResolved([ rawType, rawPointerType, rawConstPointerType ], baseClassRawType ? [ baseClassRawType ] : [], base => {
    base = base[0];
    var baseClass;
    var basePrototype;
    if (baseClassRawType) {
      baseClass = base.registeredClass;
      basePrototype = baseClass.instancePrototype;
    } else {
      basePrototype = ClassHandle.prototype;
    }
    var constructor = createNamedFunction(name, function(...args) {
      if (Object.getPrototypeOf(this) !== instancePrototype) {
        throw new BindingError("Use 'new' to construct " + name);
      }
      if (undefined === registeredClass.constructor_body) {
        throw new BindingError(name + " has no accessible constructor");
      }
      var body = registeredClass.constructor_body[args.length];
      if (undefined === body) {
        throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
      }
      return body.apply(this, args);
    });
    var instancePrototype = Object.create(basePrototype, {
      constructor: {
        value: constructor
      }
    });
    constructor.prototype = instancePrototype;
    var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
    if (registeredClass.baseClass) {
      // Keep track of class hierarchy. Used to allow sub-classes to inherit class functions.
      registeredClass.baseClass.__derivedClasses ??= [];
      registeredClass.baseClass.__derivedClasses.push(registeredClass);
    }
    var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
    var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
    var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
    registeredPointers[rawType] = {
      pointerType: pointerConverter,
      constPointerType: constPointerConverter
    };
    replacePublicSymbol(legalFunctionName, constructor);
    return [ referenceConverter, pointerConverter, constPointerConverter ];
  });
}

var heap32VectorToArray = (count, firstElement) => {
  var array = [];
  for (var i = 0; i < count; i++) {
    // TODO(https://github.com/emscripten-core/emscripten/issues/17310):
    // Find a way to hoist the `>> 2` or `>> 3` out of this loop.
    array.push(HEAPU32[(((firstElement) + (i * 4)) >>> 2) >>> 0]);
  }
  return array;
};

var runDestructors = destructors => {
  while (destructors.length) {
    var ptr = destructors.pop();
    var del = destructors.pop();
    del(ptr);
  }
};

function usesDestructorStack(argTypes) {
  // Skip return value at index 0 - it's not deleted here.
  for (var i = 1; i < argTypes.length; ++i) {
    // The type does not define a destructor function - must use dynamic stack
    if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
      return true;
    }
  }
  return false;
}

function newFunc(constructor, argumentList) {
  if (!(constructor instanceof Function)) {
    throw new TypeError(`new_ called with constructor type ${typeof (constructor)} which is not a function`);
  }
  /*
       * Previously, the following line was just:
       *   function dummy() {};
       * Unfortunately, Chrome was preserving 'dummy' as the object's name, even
       * though at creation, the 'dummy' has the correct constructor name.  Thus,
       * objects created with IMVU.new would show up in the debugger as 'dummy',
       * which isn't very helpful.  Using IMVU.createNamedFunction addresses the
       * issue.  Doubly-unfortunately, there's no way to write a test for this
       * behavior.  -NRD 2013.02.22
       */ var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {});
  dummy.prototype = constructor.prototype;
  var obj = new dummy;
  var r = constructor.apply(obj, argumentList);
  return (r instanceof Object) ? r : obj;
}

function checkArgCount(numArgs, minArgs, maxArgs, humanName, throwBindingError) {
  if (numArgs < minArgs || numArgs > maxArgs) {
    var argCountMessage = minArgs == maxArgs ? minArgs : `${minArgs} to ${maxArgs}`;
    throwBindingError(`function ${humanName} called with ${numArgs} arguments, expected ${argCountMessage}`);
  }
}

function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
  var needsDestructorStack = usesDestructorStack(argTypes);
  var argCount = argTypes.length - 2;
  var argsList = [];
  var argsListWired = [ "fn" ];
  if (isClassMethodFunc) {
    argsListWired.push("thisWired");
  }
  for (var i = 0; i < argCount; ++i) {
    argsList.push(`arg${i}`);
    argsListWired.push(`arg${i}Wired`);
  }
  argsList = argsList.join(",");
  argsListWired = argsListWired.join(",");
  var invokerFnBody = `return function (${argsList}) {\n`;
  invokerFnBody += "checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);\n";
  if (needsDestructorStack) {
    invokerFnBody += "var destructors = [];\n";
  }
  var dtorStack = needsDestructorStack ? "destructors" : "null";
  var args1 = [ "humanName", "throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam" ];
  if (isClassMethodFunc) {
    invokerFnBody += `var thisWired = classParam['toWireType'](${dtorStack}, this);\n`;
  }
  for (var i = 0; i < argCount; ++i) {
    invokerFnBody += `var arg${i}Wired = argType${i}['toWireType'](${dtorStack}, arg${i});\n`;
    args1.push(`argType${i}`);
  }
  invokerFnBody += (returns || isAsync ? "var rv = " : "") + `invoker(${argsListWired});\n`;
  var returnVal = returns ? "rv" : "";
  if (needsDestructorStack) {
    invokerFnBody += "runDestructors(destructors);\n";
  } else {
    for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
      // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
      var paramName = (i === 1 ? "thisWired" : ("arg" + (i - 2) + "Wired"));
      if (argTypes[i].destructorFunction !== null) {
        invokerFnBody += `${paramName}_dtor(${paramName});\n`;
        args1.push(`${paramName}_dtor`);
      }
    }
  }
  if (returns) {
    invokerFnBody += "var ret = retType['fromWireType'](rv);\n" + "return ret;\n";
  } else {}
  invokerFnBody += "}\n";
  args1.push("checkArgCount", "minArgs", "maxArgs");
  invokerFnBody = `if (arguments.length !== ${args1.length}){ throw new Error(humanName + "Expected ${args1.length} closure arguments " + arguments.length + " given."); }\n${invokerFnBody}`;
  return [ args1, invokerFnBody ];
}

function getRequiredArgCount(argTypes) {
  var requiredArgCount = argTypes.length - 2;
  for (var i = argTypes.length - 1; i >= 2; --i) {
    if (!argTypes[i].optional) {
      break;
    }
    requiredArgCount--;
  }
  return requiredArgCount;
}

function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, /** boolean= */ isAsync) {
  // humanName: a human-readable string name for the function to be generated.
  // argTypes: An array that contains the embind type objects for all types in the function signature.
  //    argTypes[0] is the type object for the function return value.
  //    argTypes[1] is the type object for function this object/class type, or null if not crafting an invoker for a class method.
  //    argTypes[2...] are the actual function parameters.
  // classType: The embind type object for the class to be bound, or null if this is not a method of a class.
  // cppInvokerFunc: JS Function object to the C++-side function that interops into C++ code.
  // cppTargetFunc: Function pointer (an integer to FUNCTION_TABLE) to the target C++ function the cppInvokerFunc will end up calling.
  // isAsync: Optional. If true, returns an async function. Async bindings are only supported with JSPI.
  var argCount = argTypes.length;
  if (argCount < 2) {
    throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  assert(!isAsync, "Async bindings are only supported with JSPI.");
  var isClassMethodFunc = (argTypes[1] !== null && classType !== null);
  // Free functions with signature "void function()" do not need an invoker that marshalls between wire types.
  // TODO: This omits argument count check - enable only at -O3 or similar.
  //    if (ENABLE_UNSAFE_OPTS && argCount == 2 && argTypes[0].name == "void" && !isClassMethodFunc) {
  //       return FUNCTION_TABLE[fn];
  //    }
  // Determine if we need to use a dynamic stack to store the destructors for the function parameters.
  // TODO: Remove this completely once all function invokers are being dynamically generated.
  var needsDestructorStack = usesDestructorStack(argTypes);
  var returns = (argTypes[0].name !== "void");
  var expectedArgCount = argCount - 2;
  var minArgs = getRequiredArgCount(argTypes);
  // Builld the arguments that will be passed into the closure around the invoker
  // function.
  var closureArgs = [ humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1] ];
  for (var i = 0; i < argCount - 2; ++i) {
    closureArgs.push(argTypes[i + 2]);
  }
  if (!needsDestructorStack) {
    for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
      // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
      if (argTypes[i].destructorFunction !== null) {
        closureArgs.push(argTypes[i].destructorFunction);
      }
    }
  }
  closureArgs.push(checkArgCount, minArgs, expectedArgCount);
  let [args, invokerFnBody] = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
  args.push(invokerFnBody);
  var invokerFn = newFunc(Function, args)(...closureArgs);
  return createNamedFunction(humanName, invokerFn);
}

var __embind_register_class_constructor = function(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
  rawClassType >>>= 0;
  rawArgTypesAddr >>>= 0;
  invokerSignature >>>= 0;
  invoker >>>= 0;
  rawConstructor >>>= 0;
  assert(argCount > 0);
  var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
  invoker = embind__requireFunction(invokerSignature, invoker);
  var args = [ rawConstructor ];
  var destructors = [];
  whenDependentTypesAreResolved([], [ rawClassType ], classType => {
    classType = classType[0];
    var humanName = `constructor ${classType.name}`;
    if (undefined === classType.registeredClass.constructor_body) {
      classType.registeredClass.constructor_body = [];
    }
    if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
      throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    classType.registeredClass.constructor_body[argCount - 1] = () => {
      throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
    };
    whenDependentTypesAreResolved([], rawArgTypes, argTypes => {
      // Insert empty slot for context type (argTypes[1]).
      argTypes.splice(1, 0, null);
      classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
      return [];
    });
    return [];
  });
};

var getFunctionName = signature => {
  signature = signature.trim();
  const argsIndex = signature.indexOf("(");
  if (argsIndex !== -1) {
    assert(signature[signature.length - 1] == ")", "Parentheses for argument names should match.");
    return signature.substr(0, argsIndex);
  } else {
    return signature;
  }
};

var __embind_register_class_function = function(rawClassType, methodName, argCount, rawArgTypesAddr, // [ReturnType, ThisType, Args...]
invokerSignature, rawInvoker, context, isPureVirtual, isAsync, isNonnullReturn) {
  rawClassType >>>= 0;
  methodName >>>= 0;
  rawArgTypesAddr >>>= 0;
  invokerSignature >>>= 0;
  rawInvoker >>>= 0;
  context >>>= 0;
  var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
  methodName = readLatin1String(methodName);
  methodName = getFunctionName(methodName);
  rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
  whenDependentTypesAreResolved([], [ rawClassType ], classType => {
    classType = classType[0];
    var humanName = `${classType.name}.${methodName}`;
    if (methodName.startsWith("@@")) {
      methodName = Symbol[methodName.substring(2)];
    }
    if (isPureVirtual) {
      classType.registeredClass.pureVirtualFunctions.push(methodName);
    }
    function unboundTypesHandler() {
      throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
    }
    var proto = classType.registeredClass.instancePrototype;
    var method = proto[methodName];
    if (undefined === method || (undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2)) {
      // This is the first overload to be registered, OR we are replacing a
      // function in the base class with a function in the derived class.
      unboundTypesHandler.argCount = argCount - 2;
      unboundTypesHandler.className = classType.name;
      proto[methodName] = unboundTypesHandler;
    } else {
      // There was an existing function with the same name registered. Set up
      // a function overload routing table.
      ensureOverloadTable(proto, methodName, humanName);
      proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
    }
    whenDependentTypesAreResolved([], rawArgTypes, argTypes => {
      var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
      // Replace the initial unbound-handler-stub function with the
      // appropriate member function, now that all types are resolved. If
      // multiple overloads are registered for this function, the function
      // goes into an overload table.
      if (undefined === proto[methodName].overloadTable) {
        // Set argCount in case an overload is registered later
        memberFunction.argCount = argCount - 2;
        proto[methodName] = memberFunction;
      } else {
        proto[methodName].overloadTable[argCount - 2] = memberFunction;
      }
      return [];
    });
    return [];
  });
};

var emval_freelist = [];

var emval_handles = [];

function __emval_decref(handle) {
  handle >>>= 0;
  if (handle > 9 && 0 === --emval_handles[handle + 1]) {
    assert(emval_handles[handle] !== undefined, `Decref for unallocated handle.`);
    emval_handles[handle] = undefined;
    emval_freelist.push(handle);
  }
}

var count_emval_handles = () => emval_handles.length / 2 - 5 - emval_freelist.length;

var init_emval = () => {
  // reserve 0 and some special values. These never get de-allocated.
  emval_handles.push(0, 1, undefined, 1, null, 1, true, 1, false, 1);
  assert(emval_handles.length === 5 * 2);
  Module["count_emval_handles"] = count_emval_handles;
};

var Emval = {
  toValue: handle => {
    if (!handle) {
      throwBindingError("Cannot use deleted val. handle = " + handle);
    }
    // handle 2 is supposed to be `undefined`.
    assert(handle === 2 || emval_handles[handle] !== undefined && handle % 2 === 0, `invalid handle: ${handle}`);
    return emval_handles[handle];
  },
  toHandle: value => {
    switch (value) {
     case undefined:
      return 2;

     case null:
      return 4;

     case true:
      return 6;

     case false:
      return 8;

     default:
      {
        const handle = emval_freelist.pop() || emval_handles.length;
        emval_handles[handle] = value;
        emval_handles[handle + 1] = 1;
        return handle;
      }
    }
  }
};

var EmValType = {
  name: "emscripten::val",
  "fromWireType": handle => {
    var rv = Emval.toValue(handle);
    __emval_decref(handle);
    return rv;
  },
  "toWireType": (destructors, value) => Emval.toHandle(value),
  argPackAdvance: GenericWireTypeSize,
  "readValueFromPointer": readPointer,
  destructorFunction: null
};

// This type does not need a destructor
// TODO: do we need a deleteObject here?  write a test where
// emval is passed into JS via an interface
function __embind_register_emval(rawType) {
  rawType >>>= 0;
  return registerType(rawType, EmValType);
}

var floatReadValueFromPointer = (name, width) => {
  switch (width) {
   case 4:
    return function(pointer) {
      return this["fromWireType"](HEAPF32[((pointer) >>> 2) >>> 0]);
    };

   case 8:
    return function(pointer) {
      return this["fromWireType"](HEAPF64[((pointer) >>> 3) >>> 0]);
    };

   default:
    throw new TypeError(`invalid float width (${width}): ${name}`);
  }
};

var __embind_register_float = function(rawType, name, size) {
  rawType >>>= 0;
  name >>>= 0;
  size >>>= 0;
  name = readLatin1String(name);
  registerType(rawType, {
    name,
    "fromWireType": value => value,
    "toWireType": (destructors, value) => {
      if (typeof value != "number" && typeof value != "boolean") {
        throw new TypeError(`Cannot convert ${embindRepr(value)} to ${this.name}`);
      }
      // The VM will perform JS to Wasm value conversion, according to the spec:
      // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
      return value;
    },
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": floatReadValueFromPointer(name, size),
    destructorFunction: null
  });
};

function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) {
  name >>>= 0;
  rawArgTypesAddr >>>= 0;
  signature >>>= 0;
  rawInvoker >>>= 0;
  fn >>>= 0;
  var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
  name = readLatin1String(name);
  name = getFunctionName(name);
  rawInvoker = embind__requireFunction(signature, rawInvoker);
  exposePublicSymbol(name, function() {
    throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
  }, argCount - 1);
  whenDependentTypesAreResolved([], argTypes, argTypes => {
    var invokerArgsArray = [ argTypes[0], /* return value */ null ].concat(/* no class 'this'*/ argTypes.slice(1));
    /* actual params */ replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, /* no class 'this'*/ rawInvoker, fn, isAsync), argCount - 1);
    return [];
  });
}

/** @suppress {globalThis} */ function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
  primitiveType >>>= 0;
  name >>>= 0;
  size >>>= 0;
  name = readLatin1String(name);
  // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come
  // out as 'i32 -1'. Always treat those as max u32.
  if (maxRange === -1) {
    maxRange = 4294967295;
  }
  var fromWireType = value => value;
  if (minRange === 0) {
    var bitshift = 32 - 8 * size;
    fromWireType = value => (value << bitshift) >>> bitshift;
  }
  var isUnsignedType = (name.includes("unsigned"));
  var checkAssertions = (value, toTypeName) => {
    if (typeof value != "number" && typeof value != "boolean") {
      throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${toTypeName}`);
    }
    if (value < minRange || value > maxRange) {
      throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`);
    }
  };
  var toWireType;
  if (isUnsignedType) {
    toWireType = function(destructors, value) {
      checkAssertions(value, this.name);
      return value >>> 0;
    };
  } else {
    toWireType = function(destructors, value) {
      checkAssertions(value, this.name);
      // The VM will perform JS to Wasm value conversion, according to the spec:
      // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
      return value;
    };
  }
  registerType(primitiveType, {
    name,
    "fromWireType": fromWireType,
    "toWireType": toWireType,
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": integerReadValueFromPointer(name, size, minRange !== 0),
    destructorFunction: null
  });
}

function __embind_register_memory_view(rawType, dataTypeIndex, name) {
  rawType >>>= 0;
  name >>>= 0;
  var typeMapping = [ Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array ];
  var TA = typeMapping[dataTypeIndex];
  function decodeMemoryView(handle) {
    var size = HEAPU32[((handle) >>> 2) >>> 0];
    var data = HEAPU32[(((handle) + (4)) >>> 2) >>> 0];
    return new TA(HEAP8.buffer, data, size);
  }
  name = readLatin1String(name);
  registerType(rawType, {
    name,
    "fromWireType": decodeMemoryView,
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": decodeMemoryView
  }, {
    ignoreDuplicateRegistrations: true
  });
}

function __embind_register_std_string(rawType, name) {
  rawType >>>= 0;
  name >>>= 0;
  name = readLatin1String(name);
  var stdStringIsUTF8 = //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
  (name === "std::string");
  registerType(rawType, {
    name,
    // For some method names we use string keys here since they are part of
    // the public/external API and/or used by the runtime-generated code.
    "fromWireType"(value) {
      var length = HEAPU32[((value) >>> 2) >>> 0];
      var payload = value + 4;
      var str;
      if (stdStringIsUTF8) {
        var decodeStartPtr = payload;
        // Looping here to support possible embedded '0' bytes
        for (var i = 0; i <= length; ++i) {
          var currentBytePtr = payload + i;
          if (i == length || HEAPU8[currentBytePtr >>> 0] == 0) {
            var maxRead = currentBytePtr - decodeStartPtr;
            var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
            if (str === undefined) {
              str = stringSegment;
            } else {
              str += String.fromCharCode(0);
              str += stringSegment;
            }
            decodeStartPtr = currentBytePtr + 1;
          }
        }
      } else {
        var a = new Array(length);
        for (var i = 0; i < length; ++i) {
          a[i] = String.fromCharCode(HEAPU8[payload + i >>> 0]);
        }
        str = a.join("");
      }
      _free(value);
      return str;
    },
    "toWireType"(destructors, value) {
      if (value instanceof ArrayBuffer) {
        value = new Uint8Array(value);
      }
      var length;
      var valueIsOfTypeString = (typeof value == "string");
      if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
        throwBindingError("Cannot pass non-string to std::string");
      }
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        length = lengthBytesUTF8(value);
      } else {
        length = value.length;
      }
      // assumes POINTER_SIZE alignment
      var base = _malloc(4 + length + 1);
      var ptr = base + 4;
      HEAPU32[((base) >>> 2) >>> 0] = length;
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        stringToUTF8(value, ptr, length + 1);
      } else {
        if (valueIsOfTypeString) {
          for (var i = 0; i < length; ++i) {
            var charCode = value.charCodeAt(i);
            if (charCode > 255) {
              _free(ptr);
              throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
            }
            HEAPU8[ptr + i >>> 0] = charCode;
          }
        } else {
          for (var i = 0; i < length; ++i) {
            HEAPU8[ptr + i >>> 0] = value[i];
          }
        }
      }
      if (destructors !== null) {
        destructors.push(_free, base);
      }
      return base;
    },
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": readPointer,
    destructorFunction(ptr) {
      _free(ptr);
    }
  });
}

var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;

var UTF16ToString = (ptr, maxBytesToRead) => {
  assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on
  // null terminator by itself.
  // Also, use the length info to avoid running tiny strings through
  // TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx >>> 0]) ++idx;
  endPtr = idx << 1;
  if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr >>> 0, endPtr >>> 0));
  // Fallback: decode without UTF16Decoder
  var str = "";
  // If maxBytesToRead is not passed explicitly, it will be undefined, and the
  // for-loop's condition will always evaluate to true. The loop is then
  // terminated on the first null char.
  for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
    var codeUnit = HEAP16[(((ptr) + (i * 2)) >>> 1) >>> 0];
    if (codeUnit == 0) break;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can
    // pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
  return str;
};

var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
  assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  maxBytesToWrite ??= 2147483647;
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2;
  // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length * 2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i);
    // possibly a lead surrogate
    HEAP16[((outPtr) >>> 1) >>> 0] = codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr) >>> 1) >>> 0] = 0;
  return outPtr - startPtr;
};

var lengthBytesUTF16 = str => str.length * 2;

var UTF32ToString = (ptr, maxBytesToRead) => {
  assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var i = 0;
  var str = "";
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr) + (i * 4)) >>> 2) >>> 0];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 65536) {
      var ch = utf32 - 65536;
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
};

var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
  outPtr >>>= 0;
  assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  maxBytesToWrite ??= 2147483647;
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    // possibly a lead surrogate
    if (codeUnit >= 55296 && codeUnit <= 57343) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 65536 + ((codeUnit & 1023) << 10) | (trailSurrogate & 1023);
    }
    HEAP32[((outPtr) >>> 2) >>> 0] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr) >>> 2) >>> 0] = 0;
  return outPtr - startPtr;
};

var lengthBytesUTF32 = str => {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
    // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }
  return len;
};

var __embind_register_std_wstring = function(rawType, charSize, name) {
  rawType >>>= 0;
  charSize >>>= 0;
  name >>>= 0;
  name = readLatin1String(name);
  var decodeString, encodeString, readCharAt, lengthBytesUTF;
  if (charSize === 2) {
    decodeString = UTF16ToString;
    encodeString = stringToUTF16;
    lengthBytesUTF = lengthBytesUTF16;
    readCharAt = pointer => HEAPU16[((pointer) >>> 1) >>> 0];
  } else if (charSize === 4) {
    decodeString = UTF32ToString;
    encodeString = stringToUTF32;
    lengthBytesUTF = lengthBytesUTF32;
    readCharAt = pointer => HEAPU32[((pointer) >>> 2) >>> 0];
  }
  registerType(rawType, {
    name,
    "fromWireType": value => {
      // Code mostly taken from _embind_register_std_string fromWireType
      var length = HEAPU32[((value) >>> 2) >>> 0];
      var str;
      var decodeStartPtr = value + 4;
      // Looping here to support possible embedded '0' bytes
      for (var i = 0; i <= length; ++i) {
        var currentBytePtr = value + 4 + i * charSize;
        if (i == length || readCharAt(currentBytePtr) == 0) {
          var maxReadBytes = currentBytePtr - decodeStartPtr;
          var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
          if (str === undefined) {
            str = stringSegment;
          } else {
            str += String.fromCharCode(0);
            str += stringSegment;
          }
          decodeStartPtr = currentBytePtr + charSize;
        }
      }
      _free(value);
      return str;
    },
    "toWireType": (destructors, value) => {
      if (!(typeof value == "string")) {
        throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
      }
      // assumes POINTER_SIZE alignment
      var length = lengthBytesUTF(value);
      var ptr = _malloc(4 + length + charSize);
      HEAPU32[((ptr) >>> 2) >>> 0] = length / charSize;
      encodeString(value, ptr + 4, length + charSize);
      if (destructors !== null) {
        destructors.push(_free, ptr);
      }
      return ptr;
    },
    argPackAdvance: GenericWireTypeSize,
    "readValueFromPointer": readPointer,
    destructorFunction(ptr) {
      _free(ptr);
    }
  });
};

var __embind_register_void = function(rawType, name) {
  rawType >>>= 0;
  name >>>= 0;
  name = readLatin1String(name);
  registerType(rawType, {
    isVoid: true,
    // void return values can be optimized out sometimes
    name,
    argPackAdvance: 0,
    "fromWireType": () => undefined,
    // TODO: assert if anything else is given?
    "toWireType": (destructors, o) => undefined
  });
};

var nowIsMonotonic = 1;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

var __emscripten_runtime_keepalive_clear = () => {
  noExitRuntime = false;
  runtimeKeepaliveCounter = 0;
};

var __emscripten_throw_longjmp = () => {
  throw Infinity;
};

var requireRegisteredType = (rawType, humanName) => {
  var impl = registeredTypes[rawType];
  if (undefined === impl) {
    throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
  }
  return impl;
};

var emval_returnValue = (returnType, destructorsRef, handle) => {
  var destructors = [];
  var result = returnType["toWireType"](destructors, handle);
  if (destructors.length) {
    // void, primitives and any other types w/o destructors don't need to allocate a handle
    HEAPU32[((destructorsRef) >>> 2) >>> 0] = Emval.toHandle(destructors);
  }
  return result;
};

function __emval_as(handle, returnType, destructorsRef) {
  handle >>>= 0;
  returnType >>>= 0;
  destructorsRef >>>= 0;
  handle = Emval.toValue(handle);
  returnType = requireRegisteredType(returnType, "emval::as");
  return emval_returnValue(returnType, destructorsRef, handle);
}

var emval_methodCallers = [];

function __emval_call(caller, handle, destructorsRef, args) {
  caller >>>= 0;
  handle >>>= 0;
  destructorsRef >>>= 0;
  args >>>= 0;
  caller = emval_methodCallers[caller];
  handle = Emval.toValue(handle);
  return caller(null, handle, destructorsRef, args);
}

var emval_symbols = {};

var getStringOrSymbol = address => {
  var symbol = emval_symbols[address];
  if (symbol === undefined) {
    return readLatin1String(address);
  }
  return symbol;
};

function __emval_call_method(caller, objHandle, methodName, destructorsRef, args) {
  caller >>>= 0;
  objHandle >>>= 0;
  methodName >>>= 0;
  destructorsRef >>>= 0;
  args >>>= 0;
  caller = emval_methodCallers[caller];
  objHandle = Emval.toValue(objHandle);
  methodName = getStringOrSymbol(methodName);
  return caller(objHandle, objHandle[methodName], destructorsRef, args);
}

function __emval_delete(object, property) {
  object >>>= 0;
  property >>>= 0;
  object = Emval.toValue(object);
  property = Emval.toValue(property);
  return delete object[property];
}

function __emval_equals(first, second) {
  first >>>= 0;
  second >>>= 0;
  first = Emval.toValue(first);
  second = Emval.toValue(second);
  return first == second;
}

var emval_get_global = () => {
  if (typeof globalThis == "object") {
    return globalThis;
  }
  return (function() {
    return Function;
  })()("return this")();
};

function __emval_get_global(name) {
  name >>>= 0;
  if (name === 0) {
    return Emval.toHandle(emval_get_global());
  } else {
    name = getStringOrSymbol(name);
    return Emval.toHandle(emval_get_global()[name]);
  }
}

var emval_addMethodCaller = caller => {
  var id = emval_methodCallers.length;
  emval_methodCallers.push(caller);
  return id;
};

var emval_lookupTypes = (argCount, argTypes) => {
  var a = new Array(argCount);
  for (var i = 0; i < argCount; ++i) {
    a[i] = requireRegisteredType(HEAPU32[(((argTypes) + (i * 4)) >>> 2) >>> 0], "parameter " + i);
  }
  return a;
};

var reflectConstruct = Reflect.construct;

function __emval_get_method_caller(argCount, argTypes, kind) {
  argTypes >>>= 0;
  var types = emval_lookupTypes(argCount, argTypes);
  var retType = types.shift();
  argCount--;
  // remove the shifted off return type
  var functionBody = `return function (obj, func, destructorsRef, args) {\n`;
  var offset = 0;
  var argsList = [];
  // 'obj?, arg0, arg1, arg2, ... , argN'
  if (kind === /* FUNCTION */ 0) {
    argsList.push("obj");
  }
  var params = [ "retType" ];
  var args = [ retType ];
  for (var i = 0; i < argCount; ++i) {
    argsList.push("arg" + i);
    params.push("argType" + i);
    args.push(types[i]);
    functionBody += `  var arg${i} = argType${i}.readValueFromPointer(args${offset ? "+" + offset : ""});\n`;
    offset += types[i].argPackAdvance;
  }
  var invoker = kind === /* CONSTRUCTOR */ 1 ? "new func" : "func.call";
  functionBody += `  var rv = ${invoker}(${argsList.join(", ")});\n`;
  if (!retType.isVoid) {
    params.push("emval_returnValue");
    args.push(emval_returnValue);
    functionBody += "  return emval_returnValue(retType, destructorsRef, rv);\n";
  }
  functionBody += "};\n";
  params.push(functionBody);
  var invokerFunction = newFunc(Function, params)(...args);
  var functionName = `methodCaller<(${types.map(t => t.name).join(", ")}) => ${retType.name}>`;
  return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
}

function __emval_get_module_property(name) {
  name >>>= 0;
  name = getStringOrSymbol(name);
  return Emval.toHandle(Module[name]);
}

function __emval_get_property(handle, key) {
  handle >>>= 0;
  key >>>= 0;
  handle = Emval.toValue(handle);
  key = Emval.toValue(key);
  return Emval.toHandle(handle[key]);
}

function __emval_incref(handle) {
  handle >>>= 0;
  if (handle > 9) {
    emval_handles[handle + 1] += 1;
  }
}

function __emval_instanceof(object, constructor) {
  object >>>= 0;
  constructor >>>= 0;
  object = Emval.toValue(object);
  constructor = Emval.toValue(constructor);
  return object instanceof constructor;
}

function __emval_new_array() {
  return Emval.toHandle([]);
}

function __emval_new_cstring(v) {
  v >>>= 0;
  return Emval.toHandle(getStringOrSymbol(v));
}

function __emval_new_object() {
  return Emval.toHandle({});
}

function __emval_not(object) {
  object >>>= 0;
  object = Emval.toValue(object);
  return !object;
}

function __emval_run_destructors(handle) {
  handle >>>= 0;
  var destructors = Emval.toValue(handle);
  runDestructors(destructors);
  __emval_decref(handle);
}

function __emval_set_property(handle, key, value) {
  handle >>>= 0;
  key >>>= 0;
  value >>>= 0;
  handle = Emval.toValue(handle);
  key = Emval.toValue(key);
  value = Emval.toValue(value);
  handle[key] = value;
}

function __emval_take_value(type, arg) {
  type >>>= 0;
  arg >>>= 0;
  type = requireRegisteredType(type, "_emval_take_value");
  var v = type["readValueFromPointer"](arg);
  return Emval.toHandle(v);
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
  var leap = isLeapYear(date.getFullYear());
  var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
  var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
  // -1 since it's days since Jan 1
  return yday;
};

function __localtime_js(time, tmPtr) {
  time = bigintToI53Checked(time);
  tmPtr >>>= 0;
  var date = new Date(time * 1e3);
  HEAP32[((tmPtr) >>> 2) >>> 0] = date.getSeconds();
  HEAP32[(((tmPtr) + (4)) >>> 2) >>> 0] = date.getMinutes();
  HEAP32[(((tmPtr) + (8)) >>> 2) >>> 0] = date.getHours();
  HEAP32[(((tmPtr) + (12)) >>> 2) >>> 0] = date.getDate();
  HEAP32[(((tmPtr) + (16)) >>> 2) >>> 0] = date.getMonth();
  HEAP32[(((tmPtr) + (20)) >>> 2) >>> 0] = date.getFullYear() - 1900;
  HEAP32[(((tmPtr) + (24)) >>> 2) >>> 0] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  HEAP32[(((tmPtr) + (28)) >>> 2) >>> 0] = yday;
  HEAP32[(((tmPtr) + (36)) >>> 2) >>> 0] = -(date.getTimezoneOffset() * 60);
  // Attention: DST is in December in South, and some regions don't have DST at all.
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
  HEAP32[(((tmPtr) + (32)) >>> 2) >>> 0] = dst;
}

var __mktime_js = function(tmPtr) {
  tmPtr >>>= 0;
  var ret = (() => {
    var date = new Date(HEAP32[(((tmPtr) + (20)) >>> 2) >>> 0] + 1900, HEAP32[(((tmPtr) + (16)) >>> 2) >>> 0], HEAP32[(((tmPtr) + (12)) >>> 2) >>> 0], HEAP32[(((tmPtr) + (8)) >>> 2) >>> 0], HEAP32[(((tmPtr) + (4)) >>> 2) >>> 0], HEAP32[((tmPtr) >>> 2) >>> 0], 0);
    // There's an ambiguous hour when the time goes back; the tm_isdst field is
    // used to disambiguate it.  Date() basically guesses, so we fix it up if it
    // guessed wrong, or fill in tm_isdst with the guess if it's -1.
    var dst = HEAP32[(((tmPtr) + (32)) >>> 2) >>> 0];
    var guessedOffset = date.getTimezoneOffset();
    var start = new Date(date.getFullYear(), 0, 1);
    var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dstOffset = Math.min(winterOffset, summerOffset);
    // DST is in December in South
    if (dst < 0) {
      // Attention: some regions don't have DST at all.
      HEAP32[(((tmPtr) + (32)) >>> 2) >>> 0] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
    } else if ((dst > 0) != (dstOffset == guessedOffset)) {
      var nonDstOffset = Math.max(winterOffset, summerOffset);
      var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
      // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
      date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
    }
    HEAP32[(((tmPtr) + (24)) >>> 2) >>> 0] = date.getDay();
    var yday = ydayFromDate(date) | 0;
    HEAP32[(((tmPtr) + (28)) >>> 2) >>> 0] = yday;
    // To match expected behavior, update fields from date
    HEAP32[((tmPtr) >>> 2) >>> 0] = date.getSeconds();
    HEAP32[(((tmPtr) + (4)) >>> 2) >>> 0] = date.getMinutes();
    HEAP32[(((tmPtr) + (8)) >>> 2) >>> 0] = date.getHours();
    HEAP32[(((tmPtr) + (12)) >>> 2) >>> 0] = date.getDate();
    HEAP32[(((tmPtr) + (16)) >>> 2) >>> 0] = date.getMonth();
    HEAP32[(((tmPtr) + (20)) >>> 2) >>> 0] = date.getYear();
    var timeMs = date.getTime();
    if (isNaN(timeMs)) {
      return -1;
    }
    // Return time in microseconds
    return timeMs / 1e3;
  })();
  return BigInt(ret);
};

function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
  len >>>= 0;
  offset = bigintToI53Checked(offset);
  allocated >>>= 0;
  addr >>>= 0;
  try {
    if (isNaN(offset)) return 61;
    var stream = SYSCALLS.getStreamFromFD(fd);
    var res = FS.mmap(stream, len, offset, prot, flags);
    var ptr = res.ptr;
    HEAP32[((allocated) >>> 2) >>> 0] = res.allocated;
    HEAPU32[((addr) >>> 2) >>> 0] = ptr;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function __munmap_js(addr, len, prot, flags, fd, offset) {
  addr >>>= 0;
  len >>>= 0;
  offset = bigintToI53Checked(offset);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    if (prot & 2) {
      SYSCALLS.doMsync(addr, stream, len, flags, offset);
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var __tzset_js = function(timezone, daylight, std_name, dst_name) {
  timezone >>>= 0;
  daylight >>>= 0;
  std_name >>>= 0;
  dst_name >>>= 0;
  // TODO: Use (malleable) environment variables instead of system settings.
  var currentYear = (new Date).getFullYear();
  var winter = new Date(currentYear, 0, 1);
  var summer = new Date(currentYear, 6, 1);
  var winterOffset = winter.getTimezoneOffset();
  var summerOffset = summer.getTimezoneOffset();
  // Local standard timezone offset. Local standard time is not adjusted for
  // daylight savings.  This code uses the fact that getTimezoneOffset returns
  // a greater value during Standard Time versus Daylight Saving Time (DST).
  // Thus it determines the expected output during Standard Time, and it
  // compares whether the output of the given date the same (Standard) or less
  // (DST).
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  // timezone is specified as seconds west of UTC ("The external variable
  // `timezone` shall be set to the difference, in seconds, between
  // Coordinated Universal Time (UTC) and local standard time."), the same
  // as returned by stdTimezoneOffset.
  // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
  HEAPU32[((timezone) >>> 2) >>> 0] = stdTimezoneOffset * 60;
  HEAP32[((daylight) >>> 2) >>> 0] = Number(winterOffset != summerOffset);
  var extractZone = timezoneOffset => {
    // Why inverse sign?
    // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
    var sign = timezoneOffset >= 0 ? "-" : "+";
    var absOffset = Math.abs(timezoneOffset);
    var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    var minutes = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
  };
  var winterName = extractZone(winterOffset);
  var summerName = extractZone(summerOffset);
  assert(winterName);
  assert(summerName);
  assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
  assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
  if (summerOffset < winterOffset) {
    // Northern hemisphere
    stringToUTF8(winterName, std_name, 17);
    stringToUTF8(summerName, dst_name, 17);
  } else {
    stringToUTF8(winterName, dst_name, 17);
    stringToUTF8(summerName, std_name, 17);
  }
};

var handleException = e => {
  // Certain exception types we do not treat as errors since they are used for
  // internal control flow.
  // 1. ExitStatus, which is thrown by exit()
  // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
  //    that wish to return to JS event loop.
  if (e instanceof ExitStatus || e == "unwind") {
    return EXITSTATUS;
  }
  checkStackCookie();
  if (e instanceof WebAssembly.RuntimeError) {
    if (_emscripten_stack_get_current() <= 0) {
      err("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 5242880)");
    }
  }
  quit_(1, e);
};

var runtimeKeepaliveCounter = 0;

var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;

var _proc_exit = code => {
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    Module["onExit"]?.(code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
};

/** @suppress {duplicate } */ /** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
  EXITSTATUS = status;
  checkUnflushedContent();
  // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
  if (keepRuntimeAlive() && !implicit) {
    var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
    readyPromiseReject(msg);
    err(msg);
  }
  _proc_exit(status);
};

var _exit = exitJS;

var maybeExit = () => {
  if (!keepRuntimeAlive()) {
    try {
      _exit(EXITSTATUS);
    } catch (e) {
      handleException(e);
    }
  }
};

var callUserCallback = func => {
  if (ABORT) {
    err("user callback triggered after runtime exited or application aborted.  Ignoring.");
    return;
  }
  try {
    func();
    maybeExit();
  } catch (e) {
    handleException(e);
  }
};

/** @param {number=} timeout */ var safeSetTimeout = (func, timeout) => setTimeout(() => {
  callUserCallback(func);
}, timeout);

var _emscripten_set_main_loop_timing = (mode, value) => {
  MainLoop.timingMode = mode;
  MainLoop.timingValue = value;
  if (!MainLoop.func) {
    err("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
    return 1;
  }
  // Return non-zero on failure, can't set timing mode when there is no main loop.
  if (!MainLoop.running) {
    MainLoop.running = true;
  }
  if (mode == 0) {
    MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
      var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
      setTimeout(MainLoop.runner, timeUntilNextTick);
    };
    // doing this each time means that on exception, we stop
    MainLoop.method = "timeout";
  } else if (mode == 1) {
    MainLoop.scheduler = function MainLoop_scheduler_rAF() {
      MainLoop.requestAnimationFrame(MainLoop.runner);
    };
    MainLoop.method = "rAF";
  } else if (mode == 2) {
    if (typeof MainLoop.setImmediate == "undefined") {
      if (typeof setImmediate == "undefined") {
        // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
        var setImmediates = [];
        var emscriptenMainLoopMessageId = "setimmediate";
        /** @param {Event} event */ var MainLoop_setImmediate_messageHandler = event => {
          // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
          // so check for both cases.
          if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
            event.stopPropagation();
            setImmediates.shift()();
          }
        };
        addEventListener("message", MainLoop_setImmediate_messageHandler, true);
        MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */ (func => {
          setImmediates.push(func);
          if (ENVIRONMENT_IS_WORKER) {
            Module["setImmediates"] ??= [];
            Module["setImmediates"].push(func);
            postMessage({
              target: emscriptenMainLoopMessageId
            });
          } else // In --proxy-to-worker, route the message via proxyClient.js
          postMessage(emscriptenMainLoopMessageId, "*");
        });
      } else {
        MainLoop.setImmediate = setImmediate;
      }
    }
    MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
      MainLoop.setImmediate(MainLoop.runner);
    };
    MainLoop.method = "immediate";
  }
  return 0;
};

var _emscripten_get_now = () => performance.now();

/**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */ var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
  assert(!MainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  MainLoop.func = iterFunc;
  MainLoop.arg = arg;
  var thisMainLoopId = MainLoop.currentlyRunningMainloop;
  function checkIsRunning() {
    if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
      maybeExit();
      return false;
    }
    return true;
  }
  // We create the loop runner here but it is not actually running until
  // _emscripten_set_main_loop_timing is called (which might happen a
  // later time).  This member signifies that the current runner has not
  // yet been started so that we can call runtimeKeepalivePush when it
  // gets it timing set for the first time.
  MainLoop.running = false;
  MainLoop.runner = function MainLoop_runner() {
    if (ABORT) return;
    if (MainLoop.queue.length > 0) {
      var start = Date.now();
      var blocker = MainLoop.queue.shift();
      blocker.func(blocker.arg);
      if (MainLoop.remainingBlockers) {
        var remaining = MainLoop.remainingBlockers;
        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
        if (blocker.counted) {
          MainLoop.remainingBlockers = next;
        } else {
          // not counted, but move the progress along a tiny bit
          next = next + .5;
          // do not steal all the next one's progress
          MainLoop.remainingBlockers = (8 * remaining + next) / 9;
        }
      }
      MainLoop.updateStatus();
      // catches pause/resume main loop from blocker execution
      if (!checkIsRunning()) return;
      setTimeout(MainLoop.runner, 0);
      return;
    }
    // catch pauses from non-main loop sources
    if (!checkIsRunning()) return;
    // Implement very basic swap interval control
    MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
    if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
      // Not the scheduled time to render this frame - skip.
      MainLoop.scheduler();
      return;
    } else if (MainLoop.timingMode == 0) {
      MainLoop.tickStartTime = _emscripten_get_now();
    }
    if (MainLoop.method === "timeout" && Module.ctx) {
      warnOnce("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
      MainLoop.method = "";
    }
    // just warn once per call to set main loop
    MainLoop.runIter(iterFunc);
    // catch pauses from the main loop itself
    if (!checkIsRunning()) return;
    MainLoop.scheduler();
  };
  if (!noSetTiming) {
    if (fps && fps > 0) {
      _emscripten_set_main_loop_timing(0, 1e3 / fps);
    } else {
      // Do rAF by rendering each frame (no decimating)
      _emscripten_set_main_loop_timing(1, 1);
    }
    MainLoop.scheduler();
  }
  if (simulateInfiniteLoop) {
    throw "unwind";
  }
};

var MainLoop = {
  running: false,
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  preMainLoop: [],
  postMainLoop: [],
  pause() {
    MainLoop.scheduler = null;
    // Incrementing this signals the previous main loop that it's now become old, and it must return.
    MainLoop.currentlyRunningMainloop++;
  },
  resume() {
    MainLoop.currentlyRunningMainloop++;
    var timingMode = MainLoop.timingMode;
    var timingValue = MainLoop.timingValue;
    var func = MainLoop.func;
    MainLoop.func = null;
    // do not set timing and call scheduler, we will do it on the next lines
    setMainLoop(func, 0, false, MainLoop.arg, true);
    _emscripten_set_main_loop_timing(timingMode, timingValue);
    MainLoop.scheduler();
  },
  updateStatus() {
    if (Module["setStatus"]) {
      var message = Module["statusMessage"] || "Please wait...";
      var remaining = MainLoop.remainingBlockers ?? 0;
      var expected = MainLoop.expectedBlockers ?? 0;
      if (remaining) {
        if (remaining < expected) {
          Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
        } else {
          Module["setStatus"](message);
        }
      } else {
        Module["setStatus"]("");
      }
    }
  },
  init() {
    Module["preMainLoop"] && MainLoop.preMainLoop.push(Module["preMainLoop"]);
    Module["postMainLoop"] && MainLoop.postMainLoop.push(Module["postMainLoop"]);
  },
  runIter(func) {
    if (ABORT) return;
    for (var pre of MainLoop.preMainLoop) {
      if (pre() === false) {
        return;
      }
    }
    // |return false| skips a frame
    callUserCallback(func);
    for (var post of MainLoop.postMainLoop) {
      post();
    }
    checkStackCookie();
  },
  nextRAF: 0,
  fakeRequestAnimationFrame(func) {
    // try to keep 60fps between calls to here
    var now = Date.now();
    if (MainLoop.nextRAF === 0) {
      MainLoop.nextRAF = now + 1e3 / 60;
    } else {
      while (now + 2 >= MainLoop.nextRAF) {
        // fudge a little, to avoid timer jitter causing us to do lots of delay:0
        MainLoop.nextRAF += 1e3 / 60;
      }
    }
    var delay = Math.max(MainLoop.nextRAF - now, 0);
    setTimeout(func, delay);
  },
  requestAnimationFrame(func) {
    if (typeof requestAnimationFrame == "function") {
      requestAnimationFrame(func);
      return;
    }
    var RAF = MainLoop.fakeRequestAnimationFrame;
    RAF(func);
  }
};

var Browser = {
  useWebGL: false,
  isFullscreen: false,
  pointerLock: false,
  moduleContextCreatedCallbacks: [],
  workers: [],
  init() {
    if (Browser.initted) return;
    Browser.initted = true;
    // Support for plugins that can process preloaded files. You can add more of these to
    // your app by creating and appending to preloadPlugins.
    // Each plugin is asked if it can handle a file based on the file's name. If it can,
    // it is given the file's raw data. When it is done, it calls a callback with the file's
    // (possibly modified) data. For example, a plugin might decompress a file, or it
    // might create some side data structure for use later (like an Image element, etc.).
    var imagePlugin = {};
    imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
      return !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
    };
    imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
      var b = new Blob([ byteArray ], {
        type: Browser.getMimetype(name)
      });
      if (b.size !== byteArray.length) {
        // Safari bug #118630
        // Safari's Blob can only take an ArrayBuffer
        b = new Blob([ (new Uint8Array(byteArray)).buffer ], {
          type: Browser.getMimetype(name)
        });
      }
      var url = URL.createObjectURL(b);
      assert(typeof url == "string", "createObjectURL must return a url as a string");
      var img = new Image;
      img.onload = () => {
        assert(img.complete, `Image ${name} could not be decoded`);
        var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement("canvas"));
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        preloadedImages[name] = canvas;
        URL.revokeObjectURL(url);
        onload?.(byteArray);
      };
      img.onerror = event => {
        err(`Image ${url} could not be decoded`);
        onerror?.();
      };
      img.src = url;
    };
    preloadPlugins.push(imagePlugin);
    var audioPlugin = {};
    audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
      return !Module["noAudioDecoding"] && name.substr(-4) in {
        ".ogg": 1,
        ".wav": 1,
        ".mp3": 1
      };
    };
    audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
      var done = false;
      function finish(audio) {
        if (done) return;
        done = true;
        preloadedAudios[name] = audio;
        onload?.(byteArray);
      }
      function fail() {
        if (done) return;
        done = true;
        preloadedAudios[name] = new Audio;
        // empty shim
        onerror?.();
      }
      var b = new Blob([ byteArray ], {
        type: Browser.getMimetype(name)
      });
      var url = URL.createObjectURL(b);
      // XXX we never revoke this!
      assert(typeof url == "string", "createObjectURL must return a url as a string");
      var audio = new Audio;
      audio.addEventListener("canplaythrough", () => finish(audio), false);
      // use addEventListener due to chromium bug 124926
      audio.onerror = function audio_onerror(event) {
        if (done) return;
        err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
        function encode64(data) {
          var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var PAD = "=";
          var ret = "";
          var leftchar = 0;
          var leftbits = 0;
          for (var i = 0; i < data.length; i++) {
            leftchar = (leftchar << 8) | data[i];
            leftbits += 8;
            while (leftbits >= 6) {
              var curr = (leftchar >> (leftbits - 6)) & 63;
              leftbits -= 6;
              ret += BASE[curr];
            }
          }
          if (leftbits == 2) {
            ret += BASE[(leftchar & 3) << 4];
            ret += PAD + PAD;
          } else if (leftbits == 4) {
            ret += BASE[(leftchar & 15) << 2];
            ret += PAD;
          }
          return ret;
        }
        audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
        finish(audio);
      };
      // we don't wait for confirmation this worked - but it's worth trying
      audio.src = url;
      // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
      safeSetTimeout(() => {
        finish(audio);
      }, // try to use it even though it is not necessarily ready to play
      1e4);
    };
    preloadPlugins.push(audioPlugin);
    // Canvas event setup
    function pointerLockChange() {
      Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
    }
    var canvas = Module["canvas"];
    if (canvas) {
      // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
      // Module['forcedAspectRatio'] = 4 / 3;
      canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {});
      canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {});
      // no-op if function does not exist
      canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
      document.addEventListener("pointerlockchange", pointerLockChange, false);
      document.addEventListener("mozpointerlockchange", pointerLockChange, false);
      document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
      document.addEventListener("mspointerlockchange", pointerLockChange, false);
      if (Module["elementPointerLock"]) {
        canvas.addEventListener("click", ev => {
          if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
            Module["canvas"].requestPointerLock();
            ev.preventDefault();
          }
        }, false);
      }
    }
  },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
    if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
    // no need to recreate GL context if it's already been created for this canvas.
    var ctx;
    var contextHandle;
    if (useWebGL) {
      // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
      var contextAttributes = {
        antialias: false,
        alpha: false,
        majorVersion: (typeof WebGL2RenderingContext != "undefined") ? 2 : 1
      };
      if (webGLContextAttributes) {
        for (var attribute in webGLContextAttributes) {
          contextAttributes[attribute] = webGLContextAttributes[attribute];
        }
      }
      // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
      // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
      // Browser.createContext() should not even be emitted.
      if (typeof GL != "undefined") {
        contextHandle = GL.createContext(canvas, contextAttributes);
        if (contextHandle) {
          ctx = GL.getContext(contextHandle).GLctx;
        }
      }
    } else {
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return null;
    if (setInModule) {
      if (!useWebGL) assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
      Module.ctx = ctx;
      if (useWebGL) GL.makeContextCurrent(contextHandle);
      Browser.useWebGL = useWebGL;
      Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
      Browser.init();
    }
    return ctx;
  },
  fullscreenHandlersInstalled: false,
  lockPointer: undefined,
  resizeCanvas: undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
    Browser.lockPointer = lockPointer;
    Browser.resizeCanvas = resizeCanvas;
    if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
    if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
    var canvas = Module["canvas"];
    function fullscreenChange() {
      Browser.isFullscreen = false;
      var canvasContainer = canvas.parentNode;
      if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
        canvas.exitFullscreen = Browser.exitFullscreen;
        if (Browser.lockPointer) canvas.requestPointerLock();
        Browser.isFullscreen = true;
        if (Browser.resizeCanvas) {
          Browser.setFullscreenCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      } else {
        // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
        canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
        canvasContainer.parentNode.removeChild(canvasContainer);
        if (Browser.resizeCanvas) {
          Browser.setWindowedCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      }
      Module["onFullScreen"]?.(Browser.isFullscreen);
      Module["onFullscreen"]?.(Browser.isFullscreen);
    }
    if (!Browser.fullscreenHandlersInstalled) {
      Browser.fullscreenHandlersInstalled = true;
      document.addEventListener("fullscreenchange", fullscreenChange, false);
      document.addEventListener("mozfullscreenchange", fullscreenChange, false);
      document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
      document.addEventListener("MSFullscreenChange", fullscreenChange, false);
    }
    // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
    var canvasContainer = document.createElement("div");
    canvas.parentNode.insertBefore(canvasContainer, canvas);
    canvasContainer.appendChild(canvas);
    // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
    canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
    canvasContainer.requestFullscreen();
  },
  requestFullScreen() {
    abort("Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)");
  },
  exitFullscreen() {
    // This is workaround for chrome. Trying to exit from fullscreen
    // not in fullscreen state will cause "TypeError: Document not active"
    // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
    if (!Browser.isFullscreen) {
      return false;
    }
    var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {});
    CFS.apply(document, []);
    return true;
  },
  safeSetTimeout(func, timeout) {
    // Legacy function, this is used by the SDL2 port so we need to keep it
    // around at least until that is updated.
    // See https://github.com/libsdl-org/SDL/pull/6304
    return safeSetTimeout(func, timeout);
  },
  getMimetype(name) {
    return {
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "png": "image/png",
      "bmp": "image/bmp",
      "ogg": "audio/ogg",
      "wav": "audio/wav",
      "mp3": "audio/mpeg"
    }[name.substr(name.lastIndexOf(".") + 1)];
  },
  getUserMedia(func) {
    window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
    window.getUserMedia(func);
  },
  getMovementX(event) {
    return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
  },
  getMovementY(event) {
    return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
  },
  getMouseWheelDelta(event) {
    var delta = 0;
    switch (event.type) {
     case "DOMMouseScroll":
      // 3 lines make up a step
      delta = event.detail / 3;
      break;

     case "mousewheel":
      // 120 units make up a step
      delta = event.wheelDelta / 120;
      break;

     case "wheel":
      delta = event.deltaY;
      switch (event.deltaMode) {
       case 0:
        // DOM_DELTA_PIXEL: 100 pixels make up a step
        delta /= 100;
        break;

       case 1:
        // DOM_DELTA_LINE: 3 lines make up a step
        delta /= 3;
        break;

       case 2:
        // DOM_DELTA_PAGE: A page makes up 80 steps
        delta *= 80;
        break;

       default:
        throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
      }
      break;

     default:
      throw "unrecognized mouse wheel event: " + event.type;
    }
    return delta;
  },
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  touches: {},
  lastTouches: {},
  calculateMouseCoords(pageX, pageY) {
    // Calculate the movement based on the changes
    // in the coordinates.
    var rect = Module["canvas"].getBoundingClientRect();
    var cw = Module["canvas"].width;
    var ch = Module["canvas"].height;
    // Neither .scrollX or .pageXOffset are defined in a spec, but
    // we prefer .scrollX because it is currently in a spec draft.
    // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
    var scrollX = ((typeof window.scrollX != "undefined") ? window.scrollX : window.pageXOffset);
    var scrollY = ((typeof window.scrollY != "undefined") ? window.scrollY : window.pageYOffset);
    // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
    // and we have no viable fallback.
    assert((typeof scrollX != "undefined") && (typeof scrollY != "undefined"), "Unable to retrieve scroll position, mouse positions likely broken.");
    var adjustedX = pageX - (scrollX + rect.left);
    var adjustedY = pageY - (scrollY + rect.top);
    // the canvas might be CSS-scaled compared to its backbuffer;
    // SDL-using content will want mouse coordinates in terms
    // of backbuffer units.
    adjustedX = adjustedX * (cw / rect.width);
    adjustedY = adjustedY * (ch / rect.height);
    return {
      x: adjustedX,
      y: adjustedY
    };
  },
  setMouseCoords(pageX, pageY) {
    const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
    Browser.mouseMovementX = x - Browser.mouseX;
    Browser.mouseMovementY = y - Browser.mouseY;
    Browser.mouseX = x;
    Browser.mouseY = y;
  },
  calculateMouseEvent(event) {
    // event should be mousemove, mousedown or mouseup
    if (Browser.pointerLock) {
      // When the pointer is locked, calculate the coordinates
      // based on the movement of the mouse.
      // Workaround for Firefox bug 764498
      if (event.type != "mousemove" && ("mozMovementX" in event)) {
        Browser.mouseMovementX = Browser.mouseMovementY = 0;
      } else {
        Browser.mouseMovementX = Browser.getMovementX(event);
        Browser.mouseMovementY = Browser.getMovementY(event);
      }
      // add the mouse delta to the current absolute mouse position
      Browser.mouseX += Browser.mouseMovementX;
      Browser.mouseY += Browser.mouseMovementY;
    } else {
      if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
        var touch = event.touch;
        if (touch === undefined) {
          return;
        }
        // the "touch" property is only defined in SDL
        var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
        if (event.type === "touchstart") {
          Browser.lastTouches[touch.identifier] = coords;
          Browser.touches[touch.identifier] = coords;
        } else if (event.type === "touchend" || event.type === "touchmove") {
          var last = Browser.touches[touch.identifier];
          last ||= coords;
          Browser.lastTouches[touch.identifier] = last;
          Browser.touches[touch.identifier] = coords;
        }
        return;
      }
      Browser.setMouseCoords(event.pageX, event.pageY);
    }
  },
  resizeListeners: [],
  updateResizeListeners() {
    var canvas = Module["canvas"];
    Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height));
  },
  setCanvasSize(width, height, noUpdates) {
    var canvas = Module["canvas"];
    Browser.updateCanvasDimensions(canvas, width, height);
    if (!noUpdates) Browser.updateResizeListeners();
  },
  windowedWidth: 0,
  windowedHeight: 0,
  setFullscreenCanvasSize() {
    // check if SDL is available
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[((SDL.screen) >>> 2) >>> 0];
      flags = flags | 8388608;
      // set SDL_FULLSCREEN flag
      HEAP32[((SDL.screen) >>> 2) >>> 0] = flags;
    }
    Browser.updateCanvasDimensions(Module["canvas"]);
    Browser.updateResizeListeners();
  },
  setWindowedCanvasSize() {
    // check if SDL is available
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[((SDL.screen) >>> 2) >>> 0];
      flags = flags & ~8388608;
      // clear SDL_FULLSCREEN flag
      HEAP32[((SDL.screen) >>> 2) >>> 0] = flags;
    }
    Browser.updateCanvasDimensions(Module["canvas"]);
    Browser.updateResizeListeners();
  },
  updateCanvasDimensions(canvas, wNative, hNative) {
    if (wNative && hNative) {
      canvas.widthNative = wNative;
      canvas.heightNative = hNative;
    } else {
      wNative = canvas.widthNative;
      hNative = canvas.heightNative;
    }
    var w = wNative;
    var h = hNative;
    if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
      if (w / h < Module["forcedAspectRatio"]) {
        w = Math.round(h * Module["forcedAspectRatio"]);
      } else {
        h = Math.round(w / Module["forcedAspectRatio"]);
      }
    }
    if (((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode) && (typeof screen != "undefined")) {
      var factor = Math.min(screen.width / w, screen.height / h);
      w = Math.round(w * factor);
      h = Math.round(h * factor);
    }
    if (Browser.resizeCanvas) {
      if (canvas.width != w) canvas.width = w;
      if (canvas.height != h) canvas.height = h;
      if (typeof canvas.style != "undefined") {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
      }
    } else {
      if (canvas.width != wNative) canvas.width = wNative;
      if (canvas.height != hNative) canvas.height = hNative;
      if (typeof canvas.style != "undefined") {
        if (w != wNative || h != hNative) {
          canvas.style.setProperty("width", w + "px", "important");
          canvas.style.setProperty("height", h + "px", "important");
        } else {
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
        }
      }
    }
  }
};

var safeRequestAnimationFrame = func => MainLoop.requestAnimationFrame(() => {
  callUserCallback(func);
});

function _emscripten_async_call(func, arg, millis) {
  func >>>= 0;
  arg >>>= 0;
  function wrapper() {
    getWasmTableEntry(func)(arg);
  }
  if (millis >= 0 || // node does not support requestAnimationFrame
  ENVIRONMENT_IS_NODE) {
    safeSetTimeout(wrapper, millis);
  } else {
    safeRequestAnimationFrame(wrapper);
  }
}

var _emscripten_cancel_animation_frame = id => cancelAnimationFrame(id);

var _emscripten_clear_timeout = clearTimeout;

var _emscripten_date_now = () => Date.now();

function _emscripten_err(str) {
  str >>>= 0;
  return err(UTF8ToString(str));
}

var JSEvents = {
  removeAllEventListeners() {
    while (JSEvents.eventHandlers.length) {
      JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
    }
    JSEvents.deferredCalls = [];
  },
  inEventHandler: 0,
  deferredCalls: [],
  deferCall(targetFunction, precedence, argsList) {
    function arraysHaveEqualContent(arrA, arrB) {
      if (arrA.length != arrB.length) return false;
      for (var i in arrA) {
        if (arrA[i] != arrB[i]) return false;
      }
      return true;
    }
    // Test if the given call was already queued, and if so, don't add it again.
    for (var call of JSEvents.deferredCalls) {
      if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
        return;
      }
    }
    JSEvents.deferredCalls.push({
      targetFunction,
      precedence,
      argsList
    });
    JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
  },
  removeDeferredCalls(targetFunction) {
    JSEvents.deferredCalls = JSEvents.deferredCalls.filter(call => call.targetFunction != targetFunction);
  },
  canPerformEventHandlerRequests() {
    if (navigator.userActivation) {
      // Verify against transient activation status from UserActivation API
      // whether it is possible to perform a request here without needing to defer. See
      // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
      // and https://caniuse.com/mdn-api_useractivation
      // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
      return navigator.userActivation.isActive;
    }
    return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
  },
  runDeferredCalls() {
    if (!JSEvents.canPerformEventHandlerRequests()) {
      return;
    }
    var deferredCalls = JSEvents.deferredCalls;
    JSEvents.deferredCalls = [];
    for (var call of deferredCalls) {
      call.targetFunction(...call.argsList);
    }
  },
  eventHandlers: [],
  removeAllHandlersOnTarget: (target, eventTypeString) => {
    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
      if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
        JSEvents._removeHandler(i--);
      }
    }
  },
  _removeHandler(i) {
    var h = JSEvents.eventHandlers[i];
    h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
    JSEvents.eventHandlers.splice(i, 1);
  },
  registerOrRemoveHandler(eventHandler) {
    if (!eventHandler.target) {
      err("registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:");
      console.dir(eventHandler);
      return -4;
    }
    if (eventHandler.callbackfunc) {
      eventHandler.eventListenerFunc = function(event) {
        // Increment nesting count for the event handler.
        ++JSEvents.inEventHandler;
        JSEvents.currentEventHandler = eventHandler;
        // Process any old deferred calls the user has placed.
        JSEvents.runDeferredCalls();
        // Process the actual event, calls back to user C code handler.
        eventHandler.handlerFunc(event);
        // Process any new deferred calls that were placed right now from this event handler.
        JSEvents.runDeferredCalls();
        // Out of event handler - restore nesting count.
        --JSEvents.inEventHandler;
      };
      eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
      JSEvents.eventHandlers.push(eventHandler);
    } else {
      for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
        if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
          JSEvents._removeHandler(i--);
        }
      }
    }
    return 0;
  },
  getNodeNameForTarget(target) {
    if (!target) return "";
    if (target == window) return "#window";
    if (target == screen) return "#screen";
    return target?.nodeName || "";
  },
  fullscreenEnabled() {
    return document.fullscreenEnabled || // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
    // TODO: If Safari at some point ships with unprefixed version, update the version check above.
    document.webkitFullscreenEnabled;
  }
};

var maybeCStringToJsString = cString => cString > 2 ? UTF8ToString(cString) : cString;

/** @type {Object} */ var specialHTMLTargets = [ 0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0 ];

var findEventTarget = target => {
  target = maybeCStringToJsString(target);
  var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : undefined);
  return domElement;
};

var getBoundingClientRect = e => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
  "left": 0,
  "top": 0
};

function _emscripten_get_element_css_size(target, width, height) {
  target >>>= 0;
  width >>>= 0;
  height >>>= 0;
  target = findEventTarget(target);
  if (!target) return -4;
  var rect = getBoundingClientRect(target);
  HEAPF64[((width) >>> 3) >>> 0] = rect.width;
  HEAPF64[((height) >>> 3) >>> 0] = rect.height;
  return 0;
}

var GLctx;

var webgl_enable_ANGLE_instanced_arrays = ctx => {
  // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
  // where the core functions will reside in WebGL 2. This way the calling code can call these without
  // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
  if (ext) {
    ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
    ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
    ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
    return 1;
  }
};

var webgl_enable_OES_vertex_array_object = ctx => {
  // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
    ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
    ctx["deleteVertexArray"] = vao => ext["deleteVertexArrayOES"](vao);
    ctx["bindVertexArray"] = vao => ext["bindVertexArrayOES"](vao);
    ctx["isVertexArray"] = vao => ext["isVertexArrayOES"](vao);
    return 1;
  }
};

var webgl_enable_WEBGL_draw_buffers = ctx => {
  // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
    ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
    return 1;
  }
};

var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = ctx => // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
!!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = ctx => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));

var webgl_enable_EXT_polygon_offset_clamp = ctx => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));

var webgl_enable_EXT_clip_control = ctx => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));

var webgl_enable_WEBGL_polygon_mode = ctx => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));

var webgl_enable_WEBGL_multi_draw = ctx => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));

var getEmscriptenSupportedExtensions = ctx => {
  // Restrict the list of advertised extensions to those that we actually
  // support.
  var supportedExtensions = [ // WebGL 1 extensions
  "ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", // WebGL 2 extensions
  "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance", // WebGL 1 and WebGL 2 extensions
  "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode" ];
  // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
  return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
};

var GL = {
  counter: 1,
  buffers: [],
  programs: [],
  framebuffers: [],
  renderbuffers: [],
  textures: [],
  shaders: [],
  vaos: [],
  contexts: [],
  offscreenCanvases: {},
  queries: [],
  samplers: [],
  transformFeedbacks: [],
  syncs: [],
  stringCache: {},
  stringiCache: {},
  unpackAlignment: 4,
  unpackRowLength: 0,
  recordError: errorCode => {
    if (!GL.lastError) {
      GL.lastError = errorCode;
    }
  },
  getNewId: table => {
    var ret = GL.counter++;
    for (var i = table.length; i < ret; i++) {
      table[i] = null;
    }
    return ret;
  },
  genObject: (n, buffers, createFunction, objectTable) => {
    for (var i = 0; i < n; i++) {
      var buffer = GLctx[createFunction]();
      var id = buffer && GL.getNewId(objectTable);
      if (buffer) {
        buffer.name = id;
        objectTable[id] = buffer;
      } else {
        GL.recordError(1282);
      }
      HEAP32[(((buffers) + (i * 4)) >>> 2) >>> 0] = id;
    }
  },
  getSource: (shader, count, string, length) => {
    var source = "";
    for (var i = 0; i < count; ++i) {
      var len = length ? HEAPU32[(((length) + (i * 4)) >>> 2) >>> 0] : undefined;
      source += UTF8ToString(HEAPU32[(((string) + (i * 4)) >>> 2) >>> 0], len);
    }
    return source;
  },
  createContext: (/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
    // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
    // context on a canvas, calling .getContext() will always return that
    // context independent of which 'webgl' or 'webgl2'
    // context version was passed. See:
    //   https://bugs.webkit.org/show_bug.cgi?id=222758
    // and:
    //   https://github.com/emscripten-core/emscripten/issues/13295.
    // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
    // version field in above check.
    if (!canvas.getContextSafariWebGL2Fixed) {
      canvas.getContextSafariWebGL2Fixed = canvas.getContext;
      /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */ function fixedGetContext(ver, attrs) {
        var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
        return ((ver == "webgl") == (gl instanceof WebGLRenderingContext)) ? gl : null;
      }
      canvas.getContext = fixedGetContext;
    }
    var ctx = (webGLContextAttributes.majorVersion > 1) ? canvas.getContext("webgl2", webGLContextAttributes) : (canvas.getContext("webgl", webGLContextAttributes));
    // https://caniuse.com/#feat=webgl
    if (!ctx) return 0;
    var handle = GL.registerContext(ctx, webGLContextAttributes);
    return handle;
  },
  registerContext: (ctx, webGLContextAttributes) => {
    // without pthreads a context is just an integer ID
    var handle = GL.getNewId(GL.contexts);
    var context = {
      handle,
      attributes: webGLContextAttributes,
      version: webGLContextAttributes.majorVersion,
      GLctx: ctx
    };
    // Store the created context object so that we can access the context
    // given a canvas without having to pass the parameters again.
    if (ctx.canvas) ctx.canvas.GLctxObject = context;
    GL.contexts[handle] = context;
    if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
      GL.initExtensions(context);
    }
    return handle;
  },
  makeContextCurrent: contextHandle => {
    // Active Emscripten GL layer context object.
    GL.currentContext = GL.contexts[contextHandle];
    // Active WebGL context object.
    Module.ctx = GLctx = GL.currentContext?.GLctx;
    return !(contextHandle && !GLctx);
  },
  getContext: contextHandle => GL.contexts[contextHandle],
  deleteContext: contextHandle => {
    if (GL.currentContext === GL.contexts[contextHandle]) {
      GL.currentContext = null;
    }
    if (typeof JSEvents == "object") {
      // Release all JS event handlers on the DOM element that the GL context is
      // associated with since the context is now deleted.
      JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
    }
    // Make sure the canvas object no longer refers to the context object so
    // there are no GC surprises.
    if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
      GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
    }
    GL.contexts[contextHandle] = null;
  },
  initExtensions: context => {
    // If this function is called without a specific context object, init the
    // extensions of the currently active context.
    context ||= GL.currentContext;
    if (context.initExtensionsDone) return;
    context.initExtensionsDone = true;
    var GLctx = context.GLctx;
    // Detect the presence of a few extensions manually, ction GL interop
    // layer itself will need to know if they exist.
    // Extensions that are available in both WebGL 1 and WebGL 2
    webgl_enable_WEBGL_multi_draw(GLctx);
    webgl_enable_EXT_polygon_offset_clamp(GLctx);
    webgl_enable_EXT_clip_control(GLctx);
    webgl_enable_WEBGL_polygon_mode(GLctx);
    // Extensions that are only available in WebGL 1 (the calls will be no-ops
    // if called on a WebGL 2 context active)
    webgl_enable_ANGLE_instanced_arrays(GLctx);
    webgl_enable_OES_vertex_array_object(GLctx);
    webgl_enable_WEBGL_draw_buffers(GLctx);
    // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
    webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
    webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
    // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
    // that's based on core APIs, and exposes only the queryCounterEXT()
    // entrypoint.
    if (context.version >= 2) {
      GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
    }
    // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
    // thus we look for the WebGL 1 version again if the WebGL 2 version
    // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
    if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
      GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
    }
    getEmscriptenSupportedExtensions(GLctx).forEach(ext => {
      // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
      // are not enabled by default.
      if (!ext.includes("lose_context") && !ext.includes("debug")) {
        // Call .getExtension() to enable that extension permanently.
        GLctx.getExtension(ext);
      }
    });
  }
};

/** @suppress {duplicate } */ var _glActiveTexture = x0 => GLctx.activeTexture(x0);

var _emscripten_glActiveTexture = _glActiveTexture;

/** @suppress {duplicate } */ var _glAttachShader = (program, shader) => {
  GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glAttachShader = _glAttachShader;

/** @suppress {duplicate } */ var _glBeginQuery = (target, id) => {
  GLctx.beginQuery(target, GL.queries[id]);
};

var _emscripten_glBeginQuery = _glBeginQuery;

/** @suppress {duplicate } */ var _glBeginQueryEXT = (target, id) => {
  GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
};

var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;

/** @suppress {duplicate } */ var _glBeginTransformFeedback = x0 => GLctx.beginTransformFeedback(x0);

var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;

/** @suppress {duplicate } */ function _glBindAttribLocation(program, index, name) {
  name >>>= 0;
  GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
}

var _emscripten_glBindAttribLocation = _glBindAttribLocation;

/** @suppress {duplicate } */ var _glBindBuffer = (target, buffer) => {
  if (target == 35051) /*GL_PIXEL_PACK_BUFFER*/ {
    // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
    // API function call when a buffer is bound to
    // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
    // binding point is non-null to know what is the proper API function to
    // call.
    GLctx.currentPixelPackBufferBinding = buffer;
  } else if (target == 35052) /*GL_PIXEL_UNPACK_BUFFER*/ {
    // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
    // use a different WebGL 2 API function call when a buffer is bound to
    // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
    // binding point is non-null to know what is the proper API function to
    // call.
    GLctx.currentPixelUnpackBufferBinding = buffer;
  }
  GLctx.bindBuffer(target, GL.buffers[buffer]);
};

var _emscripten_glBindBuffer = _glBindBuffer;

/** @suppress {duplicate } */ var _glBindBufferBase = (target, index, buffer) => {
  GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
};

var _emscripten_glBindBufferBase = _glBindBufferBase;

/** @suppress {duplicate } */ function _glBindBufferRange(target, index, buffer, offset, ptrsize) {
  offset >>>= 0;
  ptrsize >>>= 0;
  GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
}

var _emscripten_glBindBufferRange = _glBindBufferRange;

/** @suppress {duplicate } */ var _glBindFramebuffer = (target, framebuffer) => {
  GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
};

var _emscripten_glBindFramebuffer = _glBindFramebuffer;

/** @suppress {duplicate } */ var _glBindRenderbuffer = (target, renderbuffer) => {
  GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;

/** @suppress {duplicate } */ var _glBindSampler = (unit, sampler) => {
  GLctx.bindSampler(unit, GL.samplers[sampler]);
};

var _emscripten_glBindSampler = _glBindSampler;

/** @suppress {duplicate } */ var _glBindTexture = (target, texture) => {
  GLctx.bindTexture(target, GL.textures[texture]);
};

var _emscripten_glBindTexture = _glBindTexture;

/** @suppress {duplicate } */ var _glBindTransformFeedback = (target, id) => {
  GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
};

var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;

/** @suppress {duplicate } */ var _glBindVertexArray = vao => {
  GLctx.bindVertexArray(GL.vaos[vao]);
};

var _emscripten_glBindVertexArray = _glBindVertexArray;

/** @suppress {duplicate } */ var _glBindVertexArrayOES = _glBindVertexArray;

var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;

/** @suppress {duplicate } */ var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

var _emscripten_glBlendColor = _glBlendColor;

/** @suppress {duplicate } */ var _glBlendEquation = x0 => GLctx.blendEquation(x0);

var _emscripten_glBlendEquation = _glBlendEquation;

/** @suppress {duplicate } */ var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;

/** @suppress {duplicate } */ var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);

var _emscripten_glBlendFunc = _glBlendFunc;

/** @suppress {duplicate } */ var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;

/** @suppress {duplicate } */ var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;

/** @suppress {duplicate } */ function _glBufferData(target, size, data, usage) {
  size >>>= 0;
  data >>>= 0;
  // N.b. here first form specifies a heap subarray, second form an integer
  // size, so the ?: code here is polymorphic. It is advised to avoid
  // randomly mixing both uses in calling code, to avoid any potential JS
  // engine JIT issues.
  GLctx.bufferData(target, data ? HEAPU8.subarray(data >>> 0, data + size >>> 0) : size, usage);
}

var _emscripten_glBufferData = _glBufferData;

/** @suppress {duplicate } */ function _glBufferSubData(target, offset, size, data) {
  offset >>>= 0;
  size >>>= 0;
  data >>>= 0;
  GLctx.bufferSubData(target, offset, HEAPU8.subarray(data >>> 0, data + size >>> 0));
}

var _emscripten_glBufferSubData = _glBufferSubData;

/** @suppress {duplicate } */ var _glCheckFramebufferStatus = x0 => GLctx.checkFramebufferStatus(x0);

var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;

/** @suppress {duplicate } */ var _glClear = x0 => GLctx.clear(x0);

var _emscripten_glClear = _glClear;

/** @suppress {duplicate } */ var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);

var _emscripten_glClearBufferfi = _glClearBufferfi;

/** @suppress {duplicate } */ function _glClearBufferfv(buffer, drawbuffer, value) {
  value >>>= 0;
  GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value) >>> 2));
}

var _emscripten_glClearBufferfv = _glClearBufferfv;

/** @suppress {duplicate } */ function _glClearBufferiv(buffer, drawbuffer, value) {
  value >>>= 0;
  GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value) >>> 2));
}

var _emscripten_glClearBufferiv = _glClearBufferiv;

/** @suppress {duplicate } */ function _glClearBufferuiv(buffer, drawbuffer, value) {
  value >>>= 0;
  GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, ((value) >>> 2));
}

var _emscripten_glClearBufferuiv = _glClearBufferuiv;

/** @suppress {duplicate } */ var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);

var _emscripten_glClearColor = _glClearColor;

/** @suppress {duplicate } */ var _glClearDepthf = x0 => GLctx.clearDepth(x0);

var _emscripten_glClearDepthf = _glClearDepthf;

/** @suppress {duplicate } */ var _glClearStencil = x0 => GLctx.clearStencil(x0);

var _emscripten_glClearStencil = _glClearStencil;

/** @suppress {duplicate } */ function _glClientWaitSync(sync, flags, timeout) {
  sync >>>= 0;
  // WebGL2 vs GLES3 differences: in GLES3, the timeout parameter is a uint64, where 0xFFFFFFFFFFFFFFFFULL means GL_TIMEOUT_IGNORED.
  // In JS, there's no 64-bit value types, so instead timeout is taken to be signed, and GL_TIMEOUT_IGNORED is given value -1.
  // Inherently the value accepted in the timeout is lossy, and can't take in arbitrary u64 bit pattern (but most likely doesn't matter)
  // See https://www.khronos.org/registry/webgl/specs/latest/2.0/#5.15
  timeout = Number(timeout);
  return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
}

var _emscripten_glClientWaitSync = _glClientWaitSync;

/** @suppress {duplicate } */ var _glClipControlEXT = (origin, depth) => {
  GLctx.extClipControl["clipControlEXT"](origin, depth);
};

var _emscripten_glClipControlEXT = _glClipControlEXT;

/** @suppress {duplicate } */ var _glColorMask = (red, green, blue, alpha) => {
  GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};

var _emscripten_glColorMask = _glColorMask;

/** @suppress {duplicate } */ var _glCompileShader = shader => {
  GLctx.compileShader(GL.shaders[shader]);
};

var _emscripten_glCompileShader = _glCompileShader;

/** @suppress {duplicate } */ function _glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
  data >>>= 0;
  // `data` may be null here, which means "allocate uniniitalized space but
  // don't upload" in GLES parlance, but `compressedTexImage2D` requires the
  // final data parameter, so we simply pass a heap view starting at zero
  // effectively uploading whatever happens to be near address zero.  See
  // https://github.com/emscripten-core/emscripten/issues/19300.
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
      return;
    }
  }
  GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray((data) >>> 0, data + imageSize >>> 0));
}

var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;

/** @suppress {duplicate } */ function _glCompressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data) {
  data >>>= 0;
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
  } else {
    GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
  }
}

var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;

/** @suppress {duplicate } */ function _glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data) {
  data >>>= 0;
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
      GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
      return;
    }
  }
  GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray((data) >>> 0, data + imageSize >>> 0));
}

var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;

/** @suppress {duplicate } */ function _glCompressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) {
  data >>>= 0;
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
  } else {
    GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize);
  }
}

var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;

/** @suppress {duplicate } */ function _glCopyBufferSubData(x0, x1, x2, x3, x4) {
  x2 >>>= 0;
  x3 >>>= 0;
  x4 >>>= 0;
  return GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
}

var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;

/** @suppress {duplicate } */ var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);

var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;

/** @suppress {duplicate } */ var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);

var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;

/** @suppress {duplicate } */ var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);

var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;

/** @suppress {duplicate } */ var _glCreateProgram = () => {
  var id = GL.getNewId(GL.programs);
  var program = GLctx.createProgram();
  // Store additional information needed for each shader program:
  program.name = id;
  // Lazy cache results of
  // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
  program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
  program.uniformIdCounter = 1;
  GL.programs[id] = program;
  return id;
};

var _emscripten_glCreateProgram = _glCreateProgram;

/** @suppress {duplicate } */ var _glCreateShader = shaderType => {
  var id = GL.getNewId(GL.shaders);
  GL.shaders[id] = GLctx.createShader(shaderType);
  return id;
};

var _emscripten_glCreateShader = _glCreateShader;

/** @suppress {duplicate } */ var _glCullFace = x0 => GLctx.cullFace(x0);

var _emscripten_glCullFace = _glCullFace;

/** @suppress {duplicate } */ function _glDeleteBuffers(n, buffers) {
  buffers >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((buffers) + (i * 4)) >>> 2) >>> 0];
    var buffer = GL.buffers[id];
    // From spec: "glDeleteBuffers silently ignores 0's and names that do not
    // correspond to existing buffer objects."
    if (!buffer) continue;
    GLctx.deleteBuffer(buffer);
    buffer.name = 0;
    GL.buffers[id] = null;
    if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
    if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
  }
}

var _emscripten_glDeleteBuffers = _glDeleteBuffers;

/** @suppress {duplicate } */ function _glDeleteFramebuffers(n, framebuffers) {
  framebuffers >>>= 0;
  for (var i = 0; i < n; ++i) {
    var id = HEAP32[(((framebuffers) + (i * 4)) >>> 2) >>> 0];
    var framebuffer = GL.framebuffers[id];
    if (!framebuffer) continue;
    // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
    GLctx.deleteFramebuffer(framebuffer);
    framebuffer.name = 0;
    GL.framebuffers[id] = null;
  }
}

var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;

/** @suppress {duplicate } */ var _glDeleteProgram = id => {
  if (!id) return;
  var program = GL.programs[id];
  if (!program) {
    // glDeleteProgram actually signals an error when deleting a nonexisting
    // object, unlike some other GL delete functions.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  GLctx.deleteProgram(program);
  program.name = 0;
  GL.programs[id] = null;
};

var _emscripten_glDeleteProgram = _glDeleteProgram;

/** @suppress {duplicate } */ function _glDeleteQueries(n, ids) {
  ids >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0];
    var query = GL.queries[id];
    if (!query) continue;
    // GL spec: "unused names in ids are ignored, as is the name zero."
    GLctx.deleteQuery(query);
    GL.queries[id] = null;
  }
}

var _emscripten_glDeleteQueries = _glDeleteQueries;

/** @suppress {duplicate } */ function _glDeleteQueriesEXT(n, ids) {
  ids >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0];
    var query = GL.queries[id];
    if (!query) continue;
    // GL spec: "unused names in ids are ignored, as is the name zero."
    GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
    GL.queries[id] = null;
  }
}

var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;

/** @suppress {duplicate } */ function _glDeleteRenderbuffers(n, renderbuffers) {
  renderbuffers >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((renderbuffers) + (i * 4)) >>> 2) >>> 0];
    var renderbuffer = GL.renderbuffers[id];
    if (!renderbuffer) continue;
    // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
    GLctx.deleteRenderbuffer(renderbuffer);
    renderbuffer.name = 0;
    GL.renderbuffers[id] = null;
  }
}

var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;

/** @suppress {duplicate } */ function _glDeleteSamplers(n, samplers) {
  samplers >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((samplers) + (i * 4)) >>> 2) >>> 0];
    var sampler = GL.samplers[id];
    if (!sampler) continue;
    GLctx.deleteSampler(sampler);
    sampler.name = 0;
    GL.samplers[id] = null;
  }
}

var _emscripten_glDeleteSamplers = _glDeleteSamplers;

/** @suppress {duplicate } */ var _glDeleteShader = id => {
  if (!id) return;
  var shader = GL.shaders[id];
  if (!shader) {
    // glDeleteShader actually signals an error when deleting a nonexisting
    // object, unlike some other GL delete functions.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  GLctx.deleteShader(shader);
  GL.shaders[id] = null;
};

var _emscripten_glDeleteShader = _glDeleteShader;

/** @suppress {duplicate } */ function _glDeleteSync(id) {
  id >>>= 0;
  if (!id) return;
  var sync = GL.syncs[id];
  if (!sync) {
    // glDeleteSync signals an error when deleting a nonexisting object, unlike some other GL delete functions.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  GLctx.deleteSync(sync);
  sync.name = 0;
  GL.syncs[id] = null;
}

var _emscripten_glDeleteSync = _glDeleteSync;

/** @suppress {duplicate } */ function _glDeleteTextures(n, textures) {
  textures >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((textures) + (i * 4)) >>> 2) >>> 0];
    var texture = GL.textures[id];
    // GL spec: "glDeleteTextures silently ignores 0s and names that do not
    // correspond to existing textures".
    if (!texture) continue;
    GLctx.deleteTexture(texture);
    texture.name = 0;
    GL.textures[id] = null;
  }
}

var _emscripten_glDeleteTextures = _glDeleteTextures;

/** @suppress {duplicate } */ function _glDeleteTransformFeedbacks(n, ids) {
  ids >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0];
    var transformFeedback = GL.transformFeedbacks[id];
    if (!transformFeedback) continue;
    // GL spec: "unused names in ids are ignored, as is the name zero."
    GLctx.deleteTransformFeedback(transformFeedback);
    transformFeedback.name = 0;
    GL.transformFeedbacks[id] = null;
  }
}

var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;

/** @suppress {duplicate } */ function _glDeleteVertexArrays(n, vaos) {
  vaos >>>= 0;
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((vaos) + (i * 4)) >>> 2) >>> 0];
    GLctx.deleteVertexArray(GL.vaos[id]);
    GL.vaos[id] = null;
  }
}

var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;

/** @suppress {duplicate } */ var _glDeleteVertexArraysOES = _glDeleteVertexArrays;

var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;

/** @suppress {duplicate } */ var _glDepthFunc = x0 => GLctx.depthFunc(x0);

var _emscripten_glDepthFunc = _glDepthFunc;

/** @suppress {duplicate } */ var _glDepthMask = flag => {
  GLctx.depthMask(!!flag);
};

var _emscripten_glDepthMask = _glDepthMask;

/** @suppress {duplicate } */ var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);

var _emscripten_glDepthRangef = _glDepthRangef;

/** @suppress {duplicate } */ var _glDetachShader = (program, shader) => {
  GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glDetachShader = _glDetachShader;

/** @suppress {duplicate } */ var _glDisable = x0 => GLctx.disable(x0);

var _emscripten_glDisable = _glDisable;

/** @suppress {duplicate } */ var _glDisableVertexAttribArray = index => {
  GLctx.disableVertexAttribArray(index);
};

var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;

/** @suppress {duplicate } */ var _glDrawArrays = (mode, first, count) => {
  GLctx.drawArrays(mode, first, count);
};

var _emscripten_glDrawArrays = _glDrawArrays;

/** @suppress {duplicate } */ var _glDrawArraysInstanced = (mode, first, count, primcount) => {
  GLctx.drawArraysInstanced(mode, first, count, primcount);
};

var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;

/** @suppress {duplicate } */ var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;

/** @suppress {duplicate } */ var _glDrawArraysInstancedARB = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedARB = _glDrawArraysInstancedARB;

/** @suppress {duplicate } */ var _glDrawArraysInstancedEXT = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedEXT = _glDrawArraysInstancedEXT;

/** @suppress {duplicate } */ var _glDrawArraysInstancedNV = _glDrawArraysInstanced;

var _emscripten_glDrawArraysInstancedNV = _glDrawArraysInstancedNV;

var tempFixedLengthArray = [];

/** @suppress {duplicate } */ function _glDrawBuffers(n, bufs) {
  bufs >>>= 0;
  var bufArray = tempFixedLengthArray[n];
  for (var i = 0; i < n; i++) {
    bufArray[i] = HEAP32[(((bufs) + (i * 4)) >>> 2) >>> 0];
  }
  GLctx.drawBuffers(bufArray);
}

var _emscripten_glDrawBuffers = _glDrawBuffers;

/** @suppress {duplicate } */ var _glDrawBuffersEXT = _glDrawBuffers;

var _emscripten_glDrawBuffersEXT = _glDrawBuffersEXT;

/** @suppress {duplicate } */ var _glDrawBuffersWEBGL = _glDrawBuffers;

var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;

/** @suppress {duplicate } */ function _glDrawElements(mode, count, type, indices) {
  indices >>>= 0;
  GLctx.drawElements(mode, count, type, indices);
}

var _emscripten_glDrawElements = _glDrawElements;

/** @suppress {duplicate } */ function _glDrawElementsInstanced(mode, count, type, indices, primcount) {
  indices >>>= 0;
  GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
}

var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;

/** @suppress {duplicate } */ var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;

/** @suppress {duplicate } */ var _glDrawElementsInstancedARB = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedARB = _glDrawElementsInstancedARB;

/** @suppress {duplicate } */ var _glDrawElementsInstancedEXT = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedEXT = _glDrawElementsInstancedEXT;

/** @suppress {duplicate } */ var _glDrawElementsInstancedNV = _glDrawElementsInstanced;

var _emscripten_glDrawElementsInstancedNV = _glDrawElementsInstancedNV;

/** @suppress {duplicate } */ function _glDrawRangeElements(mode, start, end, count, type, indices) {
  indices >>>= 0;
  // TODO: This should be a trivial pass-though function registered at the bottom of this page as
  // glFuncs[6][1] += ' drawRangeElements';
  // but due to https://bugzilla.mozilla.org/show_bug.cgi?id=1202427,
  // we work around by ignoring the range.
  _glDrawElements(mode, count, type, indices);
}

var _emscripten_glDrawRangeElements = _glDrawRangeElements;

/** @suppress {duplicate } */ var _glEnable = x0 => GLctx.enable(x0);

var _emscripten_glEnable = _glEnable;

/** @suppress {duplicate } */ var _glEnableVertexAttribArray = index => {
  GLctx.enableVertexAttribArray(index);
};

var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;

/** @suppress {duplicate } */ var _glEndQuery = x0 => GLctx.endQuery(x0);

var _emscripten_glEndQuery = _glEndQuery;

/** @suppress {duplicate } */ var _glEndQueryEXT = target => {
  GLctx.disjointTimerQueryExt["endQueryEXT"](target);
};

var _emscripten_glEndQueryEXT = _glEndQueryEXT;

/** @suppress {duplicate } */ var _glEndTransformFeedback = () => GLctx.endTransformFeedback();

var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;

/** @suppress {duplicate } */ function _glFenceSync(condition, flags) {
  var sync = GLctx.fenceSync(condition, flags);
  if (sync) {
    var id = GL.getNewId(GL.syncs);
    sync.name = id;
    GL.syncs[id] = sync;
    return id;
  }
  return 0;
}

var _emscripten_glFenceSync = _glFenceSync;

/** @suppress {duplicate } */ var _glFinish = () => GLctx.finish();

var _emscripten_glFinish = _glFinish;

/** @suppress {duplicate } */ var _glFlush = () => GLctx.flush();

var _emscripten_glFlush = _glFlush;

/** @suppress {duplicate } */ var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
  GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;

/** @suppress {duplicate } */ var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
  GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
};

var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;

/** @suppress {duplicate } */ var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
  GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
};

var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;

/** @suppress {duplicate } */ var _glFrontFace = x0 => GLctx.frontFace(x0);

var _emscripten_glFrontFace = _glFrontFace;

/** @suppress {duplicate } */ function _glGenBuffers(n, buffers) {
  buffers >>>= 0;
  GL.genObject(n, buffers, "createBuffer", GL.buffers);
}

var _emscripten_glGenBuffers = _glGenBuffers;

/** @suppress {duplicate } */ function _glGenFramebuffers(n, ids) {
  ids >>>= 0;
  GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
}

var _emscripten_glGenFramebuffers = _glGenFramebuffers;

/** @suppress {duplicate } */ function _glGenQueries(n, ids) {
  ids >>>= 0;
  GL.genObject(n, ids, "createQuery", GL.queries);
}

var _emscripten_glGenQueries = _glGenQueries;

/** @suppress {duplicate } */ function _glGenQueriesEXT(n, ids) {
  ids >>>= 0;
  for (var i = 0; i < n; i++) {
    var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
    if (!query) {
      GL.recordError(1282);
      /* GL_INVALID_OPERATION */ while (i < n) HEAP32[(((ids) + (i++ * 4)) >>> 2) >>> 0] = 0;
      return;
    }
    var id = GL.getNewId(GL.queries);
    query.name = id;
    GL.queries[id] = query;
    HEAP32[(((ids) + (i * 4)) >>> 2) >>> 0] = id;
  }
}

var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;

/** @suppress {duplicate } */ function _glGenRenderbuffers(n, renderbuffers) {
  renderbuffers >>>= 0;
  GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
}

var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;

/** @suppress {duplicate } */ function _glGenSamplers(n, samplers) {
  samplers >>>= 0;
  GL.genObject(n, samplers, "createSampler", GL.samplers);
}

var _emscripten_glGenSamplers = _glGenSamplers;

/** @suppress {duplicate } */ function _glGenTextures(n, textures) {
  textures >>>= 0;
  GL.genObject(n, textures, "createTexture", GL.textures);
}

var _emscripten_glGenTextures = _glGenTextures;

/** @suppress {duplicate } */ function _glGenTransformFeedbacks(n, ids) {
  ids >>>= 0;
  GL.genObject(n, ids, "createTransformFeedback", GL.transformFeedbacks);
}

var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;

/** @suppress {duplicate } */ function _glGenVertexArrays(n, arrays) {
  arrays >>>= 0;
  GL.genObject(n, arrays, "createVertexArray", GL.vaos);
}

var _emscripten_glGenVertexArrays = _glGenVertexArrays;

/** @suppress {duplicate } */ var _glGenVertexArraysOES = _glGenVertexArrays;

var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;

/** @suppress {duplicate } */ var _glGenerateMipmap = x0 => GLctx.generateMipmap(x0);

var _emscripten_glGenerateMipmap = _glGenerateMipmap;

var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
  program = GL.programs[program];
  var info = GLctx[funcName](program, index);
  if (info) {
    // If an error occurs, nothing will be written to length, size and type and name.
    var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
    if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
    if (size) HEAP32[((size) >>> 2) >>> 0] = info.size;
    if (type) HEAP32[((type) >>> 2) >>> 0] = info.type;
  }
};

/** @suppress {duplicate } */ function _glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
  length >>>= 0;
  size >>>= 0;
  type >>>= 0;
  name >>>= 0;
  __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
}

var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;

/** @suppress {duplicate } */ function _glGetActiveUniform(program, index, bufSize, length, size, type, name) {
  length >>>= 0;
  size >>>= 0;
  type >>>= 0;
  name >>>= 0;
  __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
}

var _emscripten_glGetActiveUniform = _glGetActiveUniform;

/** @suppress {duplicate } */ function _glGetActiveUniformBlockName(program, uniformBlockIndex, bufSize, length, uniformBlockName) {
  length >>>= 0;
  uniformBlockName >>>= 0;
  program = GL.programs[program];
  var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
  if (!result) return;
  // If an error occurs, nothing will be written to uniformBlockName or length.
  if (uniformBlockName && bufSize > 0) {
    var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
    if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
  } else {
    if (length) HEAP32[((length) >>> 2) >>> 0] = 0;
  }
}

var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;

/** @suppress {duplicate } */ function _glGetActiveUniformBlockiv(program, uniformBlockIndex, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if params == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  program = GL.programs[program];
  if (pname == 35393) /* GL_UNIFORM_BLOCK_NAME_LENGTH */ {
    var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
    HEAP32[((params) >>> 2) >>> 0] = name.length + 1;
    return;
  }
  var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
  if (result === null) return;
  // If an error occurs, nothing should be written to params.
  if (pname == 35395) /*GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES*/ {
    for (var i = 0; i < result.length; i++) {
      HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = result[i];
    }
  } else {
    HEAP32[((params) >>> 2) >>> 0] = result;
  }
}

var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;

/** @suppress {duplicate } */ function _glGetActiveUniformsiv(program, uniformCount, uniformIndices, pname, params) {
  uniformIndices >>>= 0;
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if params == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  if (uniformCount > 0 && uniformIndices == 0) {
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  program = GL.programs[program];
  var ids = [];
  for (var i = 0; i < uniformCount; i++) {
    ids.push(HEAP32[(((uniformIndices) + (i * 4)) >>> 2) >>> 0]);
  }
  var result = GLctx.getActiveUniforms(program, ids, pname);
  if (!result) return;
  // GL spec: If an error is generated, nothing is written out to params.
  var len = result.length;
  for (var i = 0; i < len; i++) {
    HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = result[i];
  }
}

var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;

/** @suppress {duplicate } */ function _glGetAttachedShaders(program, maxCount, count, shaders) {
  count >>>= 0;
  shaders >>>= 0;
  var result = GLctx.getAttachedShaders(GL.programs[program]);
  var len = result.length;
  if (len > maxCount) {
    len = maxCount;
  }
  HEAP32[((count) >>> 2) >>> 0] = len;
  for (var i = 0; i < len; ++i) {
    var id = GL.shaders.indexOf(result[i]);
    HEAP32[(((shaders) + (i * 4)) >>> 2) >>> 0] = id;
  }
}

var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;

/** @suppress {duplicate } */ function _glGetAttribLocation(program, name) {
  name >>>= 0;
  return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
}

var _emscripten_glGetAttribLocation = _glGetAttribLocation;

var readI53FromU64 = ptr => HEAPU32[((ptr) >>> 2) >>> 0] + HEAPU32[(((ptr) + (4)) >>> 2) >>> 0] * 4294967296;

var writeI53ToI64 = (ptr, num) => {
  HEAPU32[((ptr) >>> 2) >>> 0] = num;
  var lower = HEAPU32[((ptr) >>> 2) >>> 0];
  HEAPU32[(((ptr) + (4)) >>> 2) >>> 0] = (num - lower) / 4294967296;
  var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
  var offset = ((ptr) >>> 2);
  if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset >>> 0])}, hi=${ptrToString(HEAPU32[offset + 1 >>> 0])}, which deserializes back to ${deserialized} instead!`);
};

var webglGetExtensions = function $webglGetExtensions() {
  var exts = getEmscriptenSupportedExtensions(GLctx);
  exts = exts.concat(exts.map(e => "GL_" + e));
  return exts;
};

var emscriptenWebGLGet = (name_, p, type) => {
  // Guard against user passing a null pointer.
  // Note that GLES2 spec does not say anything about how passing a null
  // pointer should be treated.  Testing on desktop core GL 3, the application
  // crashes on glGetIntegerv to a null pointer, but better to report an error
  // instead of doing anything random.
  if (!p) {
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var ret = undefined;
  switch (name_) {
   // Handle a few trivial GLES values
    case 36346:
    // GL_SHADER_COMPILER
    ret = 1;
    break;

   case 36344:
    // GL_SHADER_BINARY_FORMATS
    if (type != 0 && type != 1) {
      GL.recordError(1280);
    }
    // Do not write anything to the out pointer, since no binary formats are
    // supported.
    return;

   case 34814:
   // GL_NUM_PROGRAM_BINARY_FORMATS
    case 36345:
    // GL_NUM_SHADER_BINARY_FORMATS
    ret = 0;
    break;

   case 34466:
    // GL_NUM_COMPRESSED_TEXTURE_FORMATS
    // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
    // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
    // queried for length), so implement it ourselves to allow C++ GLES2
    // code get the length.
    var formats = GLctx.getParameter(34467);
    /*GL_COMPRESSED_TEXTURE_FORMATS*/ ret = formats ? formats.length : 0;
    break;

   case 33309:
    // GL_NUM_EXTENSIONS
    if (GL.currentContext.version < 2) {
      // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
      GL.recordError(1282);
      /* GL_INVALID_OPERATION */ return;
    }
    ret = webglGetExtensions().length;
    break;

   case 33307:
   // GL_MAJOR_VERSION
    case 33308:
    // GL_MINOR_VERSION
    if (GL.currentContext.version < 2) {
      GL.recordError(1280);
      // GL_INVALID_ENUM
      return;
    }
    ret = name_ == 33307 ? 3 : 0;
    // return version 3.0
    break;
  }
  if (ret === undefined) {
    var result = GLctx.getParameter(name_);
    switch (typeof result) {
     case "number":
      ret = result;
      break;

     case "boolean":
      ret = result ? 1 : 0;
      break;

     case "string":
      GL.recordError(1280);
      // GL_INVALID_ENUM
      return;

     case "object":
      if (result === null) {
        // null is a valid result for some (e.g., which buffer is bound -
        // perhaps nothing is bound), but otherwise can mean an invalid
        // name_, which we need to report as an error
        switch (name_) {
         case 34964:
         // ARRAY_BUFFER_BINDING
          case 35725:
         // CURRENT_PROGRAM
          case 34965:
         // ELEMENT_ARRAY_BUFFER_BINDING
          case 36006:
         // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
          case 36007:
         // RENDERBUFFER_BINDING
          case 32873:
         // TEXTURE_BINDING_2D
          case 34229:
         // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
          case 36662:
         // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
          case 36663:
         // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
          case 35053:
         // PIXEL_PACK_BUFFER_BINDING
          case 35055:
         // PIXEL_UNPACK_BUFFER_BINDING
          case 36010:
         // READ_FRAMEBUFFER_BINDING
          case 35097:
         // SAMPLER_BINDING
          case 35869:
         // TEXTURE_BINDING_2D_ARRAY
          case 32874:
         // TEXTURE_BINDING_3D
          case 36389:
         // TRANSFORM_FEEDBACK_BINDING
          case 35983:
         // TRANSFORM_FEEDBACK_BUFFER_BINDING
          case 35368:
         // UNIFORM_BUFFER_BINDING
          case 34068:
          {
            // TEXTURE_BINDING_CUBE_MAP
            ret = 0;
            break;
          }

         default:
          {
            GL.recordError(1280);
            // GL_INVALID_ENUM
            return;
          }
        }
      } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
        for (var i = 0; i < result.length; ++i) {
          switch (type) {
           case 0:
            HEAP32[(((p) + (i * 4)) >>> 2) >>> 0] = result[i];
            break;

           case 2:
            HEAPF32[(((p) + (i * 4)) >>> 2) >>> 0] = result[i];
            break;

           case 4:
            HEAP8[(p) + (i) >>> 0] = result[i] ? 1 : 0;
            break;
          }
        }
        return;
      } else {
        try {
          ret = result.name | 0;
        } catch (e) {
          GL.recordError(1280);
          // GL_INVALID_ENUM
          err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
          return;
        }
      }
      break;

     default:
      GL.recordError(1280);
      // GL_INVALID_ENUM
      err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof (result)}!`);
      return;
    }
  }
  switch (type) {
   case 1:
    writeI53ToI64(p, ret);
    break;

   case 0:
    HEAP32[((p) >>> 2) >>> 0] = ret;
    break;

   case 2:
    HEAPF32[((p) >>> 2) >>> 0] = ret;
    break;

   case 4:
    HEAP8[p >>> 0] = ret ? 1 : 0;
    break;
  }
};

/** @suppress {duplicate } */ function _glGetBooleanv(name_, p) {
  p >>>= 0;
  return emscriptenWebGLGet(name_, p, 4);
}

var _emscripten_glGetBooleanv = _glGetBooleanv;

/** @suppress {duplicate } */ function _glGetBufferParameteri64v(target, value, data) {
  data >>>= 0;
  if (!data) {
    // GLES2 specification does not specify how to behave if data is a null pointer. Since calling this function does not make sense
    // if data == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  writeI53ToI64(data, GLctx.getBufferParameter(target, value));
}

var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;

/** @suppress {duplicate } */ function _glGetBufferParameteriv(target, value, data) {
  data >>>= 0;
  if (!data) {
    // GLES2 specification does not specify how to behave if data is a null
    // pointer. Since calling this function does not make sense if data ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((data) >>> 2) >>> 0] = GLctx.getBufferParameter(target, value);
}

var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;

/** @suppress {duplicate } */ var _glGetError = () => {
  var error = GLctx.getError() || GL.lastError;
  GL.lastError = 0;
  /*GL_NO_ERROR*/ return error;
};

var _emscripten_glGetError = _glGetError;

/** @suppress {duplicate } */ function _glGetFloatv(name_, p) {
  p >>>= 0;
  return emscriptenWebGLGet(name_, p, 2);
}

var _emscripten_glGetFloatv = _glGetFloatv;

/** @suppress {duplicate } */ function _glGetFragDataLocation(program, name) {
  name >>>= 0;
  return GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
}

var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;

/** @suppress {duplicate } */ function _glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
  params >>>= 0;
  var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
  if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
    result = result.name | 0;
  }
  HEAP32[((params) >>> 2) >>> 0] = result;
}

var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;

var emscriptenWebGLGetIndexed = (target, index, data, type) => {
  if (!data) {
    // GLES2 specification does not specify how to behave if data is a null pointer. Since calling this function does not make sense
    // if data == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var result = GLctx.getIndexedParameter(target, index);
  var ret;
  switch (typeof result) {
   case "boolean":
    ret = result ? 1 : 0;
    break;

   case "number":
    ret = result;
    break;

   case "object":
    if (result === null) {
      switch (target) {
       case 35983:
       // TRANSFORM_FEEDBACK_BUFFER_BINDING
        case 35368:
        // UNIFORM_BUFFER_BINDING
        ret = 0;
        break;

       default:
        {
          GL.recordError(1280);
          // GL_INVALID_ENUM
          return;
        }
      }
    } else if (result instanceof WebGLBuffer) {
      ret = result.name | 0;
    } else {
      GL.recordError(1280);
      // GL_INVALID_ENUM
      return;
    }
    break;

   default:
    GL.recordError(1280);
    // GL_INVALID_ENUM
    return;
  }
  switch (type) {
   case 1:
    writeI53ToI64(data, ret);
    break;

   case 0:
    HEAP32[((data) >>> 2) >>> 0] = ret;
    break;

   case 2:
    HEAPF32[((data) >>> 2) >>> 0] = ret;
    break;

   case 4:
    HEAP8[data >>> 0] = ret ? 1 : 0;
    break;

   default:
    throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type;
  }
};

/** @suppress {duplicate } */ function _glGetInteger64i_v(target, index, data) {
  data >>>= 0;
  return emscriptenWebGLGetIndexed(target, index, data, 1);
}

var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;

/** @suppress {duplicate } */ function _glGetInteger64v(name_, p) {
  p >>>= 0;
  emscriptenWebGLGet(name_, p, 1);
}

var _emscripten_glGetInteger64v = _glGetInteger64v;

/** @suppress {duplicate } */ function _glGetIntegeri_v(target, index, data) {
  data >>>= 0;
  return emscriptenWebGLGetIndexed(target, index, data, 0);
}

var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;

/** @suppress {duplicate } */ function _glGetIntegerv(name_, p) {
  p >>>= 0;
  return emscriptenWebGLGet(name_, p, 0);
}

var _emscripten_glGetIntegerv = _glGetIntegerv;

/** @suppress {duplicate } */ function _glGetInternalformativ(target, internalformat, pname, bufSize, params) {
  params >>>= 0;
  if (bufSize < 0) {
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  if (!params) {
    // GLES3 specification does not specify how to behave if values is a null pointer. Since calling this function does not make sense
    // if values == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
  if (ret === null) return;
  for (var i = 0; i < ret.length && i < bufSize; ++i) {
    HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = ret[i];
  }
}

var _emscripten_glGetInternalformativ = _glGetInternalformativ;

/** @suppress {duplicate } */ function _glGetProgramBinary(program, bufSize, length, binaryFormat, binary) {
  length >>>= 0;
  binaryFormat >>>= 0;
  binary >>>= 0;
  GL.recordError(1282);
}

var _emscripten_glGetProgramBinary = _glGetProgramBinary;

/** @suppress {duplicate } */ function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
  length >>>= 0;
  infoLog >>>= 0;
  var log = GLctx.getProgramInfoLog(GL.programs[program]);
  if (log === null) log = "(unknown error)";
  var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
}

var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;

/** @suppress {duplicate } */ function _glGetProgramiv(program, pname, p) {
  p >>>= 0;
  if (!p) {
    // GLES2 specification does not specify how to behave if p is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  if (program >= GL.counter) {
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  program = GL.programs[program];
  if (pname == 35716) {
    // GL_INFO_LOG_LENGTH
    var log = GLctx.getProgramInfoLog(program);
    if (log === null) log = "(unknown error)";
    HEAP32[((p) >>> 2) >>> 0] = log.length + 1;
  } else if (pname == 35719) /* GL_ACTIVE_UNIFORM_MAX_LENGTH */ {
    if (!program.maxUniformLength) {
      var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
      /*GL_ACTIVE_UNIFORMS*/ for (var i = 0; i < numActiveUniforms; ++i) {
        program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
      }
    }
    HEAP32[((p) >>> 2) >>> 0] = program.maxUniformLength;
  } else if (pname == 35722) /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */ {
    if (!program.maxAttributeLength) {
      var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
      /*GL_ACTIVE_ATTRIBUTES*/ for (var i = 0; i < numActiveAttributes; ++i) {
        program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
      }
    }
    HEAP32[((p) >>> 2) >>> 0] = program.maxAttributeLength;
  } else if (pname == 35381) /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */ {
    if (!program.maxUniformBlockNameLength) {
      var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
      /*GL_ACTIVE_UNIFORM_BLOCKS*/ for (var i = 0; i < numActiveUniformBlocks; ++i) {
        program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
      }
    }
    HEAP32[((p) >>> 2) >>> 0] = program.maxUniformBlockNameLength;
  } else {
    HEAP32[((p) >>> 2) >>> 0] = GLctx.getProgramParameter(program, pname);
  }
}

var _emscripten_glGetProgramiv = _glGetProgramiv;

/** @suppress {duplicate } */ function _glGetQueryObjecti64vEXT(id, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var query = GL.queries[id];
  var param;
  if (GL.currentContext.version < 2) {
    param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  } else {
    param = GLctx.getQueryParameter(query, pname);
  }
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  writeI53ToI64(params, ret);
}

var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;

/** @suppress {duplicate } */ function _glGetQueryObjectivEXT(id, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var query = GL.queries[id];
  var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  HEAP32[((params) >>> 2) >>> 0] = ret;
}

var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;

/** @suppress {duplicate } */ var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;

var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;

/** @suppress {duplicate } */ function _glGetQueryObjectuiv(id, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var query = GL.queries[id];
  var param = GLctx.getQueryParameter(query, pname);
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  HEAP32[((params) >>> 2) >>> 0] = ret;
}

var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;

/** @suppress {duplicate } */ var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;

var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;

/** @suppress {duplicate } */ function _glGetQueryiv(target, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((params) >>> 2) >>> 0] = GLctx.getQuery(target, pname);
}

var _emscripten_glGetQueryiv = _glGetQueryiv;

/** @suppress {duplicate } */ function _glGetQueryivEXT(target, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((params) >>> 2) >>> 0] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
}

var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;

/** @suppress {duplicate } */ function _glGetRenderbufferParameteriv(target, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if params == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((params) >>> 2) >>> 0] = GLctx.getRenderbufferParameter(target, pname);
}

var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;

/** @suppress {duplicate } */ function _glGetSamplerParameterfv(sampler, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES3 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAPF32[((params) >>> 2) >>> 0] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
}

var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;

/** @suppress {duplicate } */ function _glGetSamplerParameteriv(sampler, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES3 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((params) >>> 2) >>> 0] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
}

var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;

/** @suppress {duplicate } */ function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
  length >>>= 0;
  infoLog >>>= 0;
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
}

var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;

/** @suppress {duplicate } */ function _glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
  range >>>= 0;
  precision >>>= 0;
  var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
  HEAP32[((range) >>> 2) >>> 0] = result.rangeMin;
  HEAP32[(((range) + (4)) >>> 2) >>> 0] = result.rangeMax;
  HEAP32[((precision) >>> 2) >>> 0] = result.precision;
}

var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;

/** @suppress {duplicate } */ function _glGetShaderSource(shader, bufSize, length, source) {
  length >>>= 0;
  source >>>= 0;
  var result = GLctx.getShaderSource(GL.shaders[shader]);
  if (!result) return;
  // If an error occurs, nothing will be written to length or source.
  var numBytesWrittenExclNull = (bufSize > 0 && source) ? stringToUTF8(result, source, bufSize) : 0;
  if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
}

var _emscripten_glGetShaderSource = _glGetShaderSource;

/** @suppress {duplicate } */ function _glGetShaderiv(shader, pname, p) {
  p >>>= 0;
  if (!p) {
    // GLES2 specification does not specify how to behave if p is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  if (pname == 35716) {
    // GL_INFO_LOG_LENGTH
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    if (log === null) log = "(unknown error)";
    // The GLES2 specification says that if the shader has an empty info log,
    // a value of 0 is returned. Otherwise the log has a null char appended.
    // (An empty string is falsey, so we can just check that instead of
    // looking at log.length.)
    var logLength = log ? log.length + 1 : 0;
    HEAP32[((p) >>> 2) >>> 0] = logLength;
  } else if (pname == 35720) {
    // GL_SHADER_SOURCE_LENGTH
    var source = GLctx.getShaderSource(GL.shaders[shader]);
    // source may be a null, or the empty string, both of which are falsey
    // values that we report a 0 length for.
    var sourceLength = source ? source.length + 1 : 0;
    HEAP32[((p) >>> 2) >>> 0] = sourceLength;
  } else {
    HEAP32[((p) >>> 2) >>> 0] = GLctx.getShaderParameter(GL.shaders[shader], pname);
  }
}

var _emscripten_glGetShaderiv = _glGetShaderiv;

var stringToNewUTF8 = str => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8(str, ret, size);
  return ret;
};

/** @suppress {duplicate } */ function _glGetString(name_) {
  var ret = GL.stringCache[name_];
  if (!ret) {
    switch (name_) {
     case 7939:
      /* GL_EXTENSIONS */ ret = stringToNewUTF8(webglGetExtensions().join(" "));
      break;

     case 7936:
     /* GL_VENDOR */ case 7937:
     /* GL_RENDERER */ case 37445:
     /* UNMASKED_VENDOR_WEBGL */ case 37446:
      /* UNMASKED_RENDERER_WEBGL */ var s = GLctx.getParameter(name_);
      if (!s) {
        GL.recordError(1280);
      }
      ret = s ? stringToNewUTF8(s) : 0;
      break;

     case 7938:
      /* GL_VERSION */ var webGLVersion = GLctx.getParameter(7938);
      // return GLES version string corresponding to the version of the WebGL context
      var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
      if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
      ret = stringToNewUTF8(glVersion);
      break;

     case 35724:
      /* GL_SHADING_LANGUAGE_VERSION */ var glslVersion = GLctx.getParameter(35724);
      // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
      var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
      var ver_num = glslVersion.match(ver_re);
      if (ver_num !== null) {
        if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
        // ensure minor version has 2 digits
        glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
      }
      ret = stringToNewUTF8(glslVersion);
      break;

     default:
      GL.recordError(1280);
    }
    // fall through
    GL.stringCache[name_] = ret;
  }
  return ret;
}

var _emscripten_glGetString = _glGetString;

/** @suppress {duplicate } */ function _glGetStringi(name, index) {
  if (GL.currentContext.version < 2) {
    GL.recordError(1282);
    // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
    return 0;
  }
  var stringiCache = GL.stringiCache[name];
  if (stringiCache) {
    if (index < 0 || index >= stringiCache.length) {
      GL.recordError(1281);
      /*GL_INVALID_VALUE*/ return 0;
    }
    return stringiCache[index];
  }
  switch (name) {
   case 7939:
    /* GL_EXTENSIONS */ var exts = webglGetExtensions().map(stringToNewUTF8);
    stringiCache = GL.stringiCache[name] = exts;
    if (index < 0 || index >= stringiCache.length) {
      GL.recordError(1281);
      /*GL_INVALID_VALUE*/ return 0;
    }
    return stringiCache[index];

   default:
    GL.recordError(1280);
    /*GL_INVALID_ENUM*/ return 0;
  }
}

var _emscripten_glGetStringi = _glGetStringi;

/** @suppress {duplicate } */ function _glGetSynciv(sync, pname, bufSize, length, values) {
  sync >>>= 0;
  length >>>= 0;
  values >>>= 0;
  if (bufSize < 0) {
    // GLES3 specification does not specify how to behave if bufSize < 0, however in the spec wording for glGetInternalformativ, it does say that GL_INVALID_VALUE should be raised,
    // so raise GL_INVALID_VALUE here as well.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  if (!values) {
    // GLES3 specification does not specify how to behave if values is a null pointer. Since calling this function does not make sense
    // if values == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
  if (ret !== null) {
    HEAP32[((values) >>> 2) >>> 0] = ret;
    if (length) HEAP32[((length) >>> 2) >>> 0] = 1;
  }
}

var _emscripten_glGetSynciv = _glGetSynciv;

/** @suppress {duplicate } */ function _glGetTexParameterfv(target, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAPF32[((params) >>> 2) >>> 0] = GLctx.getTexParameter(target, pname);
}

var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;

/** @suppress {duplicate } */ function _glGetTexParameteriv(target, pname, params) {
  params >>>= 0;
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((params) >>> 2) >>> 0] = GLctx.getTexParameter(target, pname);
}

var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;

/** @suppress {duplicate } */ function _glGetTransformFeedbackVarying(program, index, bufSize, length, size, type, name) {
  length >>>= 0;
  size >>>= 0;
  type >>>= 0;
  name >>>= 0;
  program = GL.programs[program];
  var info = GLctx.getTransformFeedbackVarying(program, index);
  if (!info) return;
  // If an error occurred, the return parameters length, size, type and name will be unmodified.
  if (name && bufSize > 0) {
    var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
    if (length) HEAP32[((length) >>> 2) >>> 0] = numBytesWrittenExclNull;
  } else {
    if (length) HEAP32[((length) >>> 2) >>> 0] = 0;
  }
  if (size) HEAP32[((size) >>> 2) >>> 0] = info.size;
  if (type) HEAP32[((type) >>> 2) >>> 0] = info.type;
}

var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;

/** @suppress {duplicate } */ function _glGetUniformBlockIndex(program, uniformBlockName) {
  uniformBlockName >>>= 0;
  return GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
}

var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;

/** @suppress {duplicate } */ function _glGetUniformIndices(program, uniformCount, uniformNames, uniformIndices) {
  uniformNames >>>= 0;
  uniformIndices >>>= 0;
  if (!uniformIndices) {
    // GLES2 specification does not specify how to behave if uniformIndices is a null pointer. Since calling this function does not make sense
    // if uniformIndices == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  program = GL.programs[program];
  var names = [];
  for (var i = 0; i < uniformCount; i++) names.push(UTF8ToString(HEAP32[(((uniformNames) + (i * 4)) >>> 2) >>> 0]));
  var result = GLctx.getUniformIndices(program, names);
  if (!result) return;
  // GL spec: If an error is generated, nothing is written out to uniformIndices.
  var len = result.length;
  for (var i = 0; i < len; i++) {
    HEAP32[(((uniformIndices) + (i * 4)) >>> 2) >>> 0] = result[i];
  }
}

var _emscripten_glGetUniformIndices = _glGetUniformIndices;

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

/** @noinline */ var webglGetLeftBracePos = name => name.slice(-1) == "]" && name.lastIndexOf("[");

var webglPrepareUniformLocationsBeforeFirstUse = program => {
  var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
  uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
  i, j;
  // On the first time invocation of glGetUniformLocation on this shader program:
  // initialize cache data structures and discover which uniforms are arrays.
  if (!uniformLocsById) {
    // maps GLint integer locations to WebGLUniformLocations
    program.uniformLocsById = uniformLocsById = {};
    // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
    program.uniformArrayNamesById = {};
    var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
    /*GL_ACTIVE_UNIFORMS*/ for (i = 0; i < numActiveUniforms; ++i) {
      var u = GLctx.getActiveUniform(program, i);
      var nm = u.name;
      var sz = u.size;
      var lb = webglGetLeftBracePos(nm);
      var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
      // Assign a new location.
      var id = program.uniformIdCounter;
      program.uniformIdCounter += sz;
      // Eagerly get the location of the uniformArray[0] base element.
      // The remaining indices >0 will be left for lazy evaluation to
      // improve performance. Those may never be needed to fetch, if the
      // application fills arrays always in full starting from the first
      // element of the array.
      uniformSizeAndIdsByName[arrayName] = [ sz, id ];
      // Store placeholder integers in place that highlight that these
      // >0 index locations are array indices pending population.
      for (j = 0; j < sz; ++j) {
        uniformLocsById[id] = j;
        program.uniformArrayNamesById[id++] = arrayName;
      }
    }
  }
};

/** @suppress {duplicate } */ function _glGetUniformLocation(program, name) {
  name >>>= 0;
  name = UTF8ToString(name);
  if (program = GL.programs[program]) {
    webglPrepareUniformLocationsBeforeFirstUse(program);
    var uniformLocsById = program.uniformLocsById;
    // Maps GLuint -> WebGLUniformLocation
    var arrayIndex = 0;
    var uniformBaseName = name;
    // Invariant: when populating integer IDs for uniform locations, we must
    // maintain the precondition that arrays reside in contiguous addresses,
    // i.e. for a 'vec4 colors[10];', colors[4] must be at location
    // colors[0]+4.  However, user might call glGetUniformLocation(program,
    // "colors") for an array, so we cannot discover based on the user input
    // arguments whether the uniform we are dealing with is an array. The only
    // way to discover which uniforms are arrays is to enumerate over all the
    // active uniforms in the program.
    var leftBrace = webglGetLeftBracePos(name);
    // If user passed an array accessor "[index]", parse the array index off the accessor.
    if (leftBrace > 0) {
      arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
      // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
      uniformBaseName = name.slice(0, leftBrace);
    }
    // Have we cached the location of this uniform before?
    // A pair [array length, GLint of the uniform location]
    var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
    // If an uniform with this name exists, and if its index is within the
    // array limits (if it's even an array), query the WebGLlocation, or
    // return an existing cached location.
    if (sizeAndId && arrayIndex < sizeAndId[0]) {
      arrayIndex += sizeAndId[1];
      // Add the base location of the uniform to the array index offset.
      if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
        return arrayIndex;
      }
    }
  } else {
    // N.b. we are currently unable to distinguish between GL program IDs that
    // never existed vs GL program IDs that have been deleted, so report
    // GL_INVALID_VALUE in both cases.
    GL.recordError(1281);
  }
  /* GL_INVALID_VALUE */ return -1;
}

var _emscripten_glGetUniformLocation = _glGetUniformLocation;

var webglGetUniformLocation = location => {
  var p = GLctx.currentProgram;
  if (p) {
    var webglLoc = p.uniformLocsById[location];
    // p.uniformLocsById[location] stores either an integer, or a
    // WebGLUniformLocation.
    // If an integer, we have not yet bound the location, so do it now. The
    // integer value specifies the array index we should bind to.
    if (typeof webglLoc == "number") {
      p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
    }
    // Else an already cached WebGLUniformLocation, return it.
    return webglLoc;
  } else {
    GL.recordError(1282);
  }
};

/** @suppress{checkTypes} */ var emscriptenWebGLGetUniform = (program, location, params, type) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if params ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  program = GL.programs[program];
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var data = GLctx.getUniform(program, webglGetUniformLocation(location));
  if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
     case 0:
      HEAP32[((params) >>> 2) >>> 0] = data;
      break;

     case 2:
      HEAPF32[((params) >>> 2) >>> 0] = data;
      break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
       case 0:
        HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
        break;

       case 2:
        HEAPF32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
        break;
      }
    }
  }
};

/** @suppress {duplicate } */ function _glGetUniformfv(program, location, params) {
  params >>>= 0;
  emscriptenWebGLGetUniform(program, location, params, 2);
}

var _emscripten_glGetUniformfv = _glGetUniformfv;

/** @suppress {duplicate } */ function _glGetUniformiv(program, location, params) {
  params >>>= 0;
  emscriptenWebGLGetUniform(program, location, params, 0);
}

var _emscripten_glGetUniformiv = _glGetUniformiv;

/** @suppress {duplicate } */ function _glGetUniformuiv(program, location, params) {
  params >>>= 0;
  return emscriptenWebGLGetUniform(program, location, params, 0);
}

var _emscripten_glGetUniformuiv = _glGetUniformuiv;

/** @suppress{checkTypes} */ var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if params ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  var data = GLctx.getVertexAttrib(index, pname);
  if (pname == 34975) /*VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/ {
    HEAP32[((params) >>> 2) >>> 0] = data && data["name"];
  } else if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
     case 0:
      HEAP32[((params) >>> 2) >>> 0] = data;
      break;

     case 2:
      HEAPF32[((params) >>> 2) >>> 0] = data;
      break;

     case 5:
      HEAP32[((params) >>> 2) >>> 0] = Math.fround(data);
      break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
       case 0:
        HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
        break;

       case 2:
        HEAPF32[(((params) + (i * 4)) >>> 2) >>> 0] = data[i];
        break;

       case 5:
        HEAP32[(((params) + (i * 4)) >>> 2) >>> 0] = Math.fround(data[i]);
        break;
      }
    }
  }
};

/** @suppress {duplicate } */ function _glGetVertexAttribIiv(index, pname, params) {
  params >>>= 0;
  // N.B. This function may only be called if the vertex attribute was specified using the function glVertexAttribI4iv(),
  // otherwise the results are undefined. (GLES3 spec 6.1.12)
  emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
}

var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;

/** @suppress {duplicate } */ var _glGetVertexAttribIuiv = _glGetVertexAttribIiv;

var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIuiv;

/** @suppress {duplicate } */ function _glGetVertexAttribPointerv(index, pname, pointer) {
  pointer >>>= 0;
  if (!pointer) {
    // GLES2 specification does not specify how to behave if pointer is a null
    // pointer. Since calling this function does not make sense if pointer ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    /* GL_INVALID_VALUE */ return;
  }
  HEAP32[((pointer) >>> 2) >>> 0] = GLctx.getVertexAttribOffset(index, pname);
}

var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;

/** @suppress {duplicate } */ function _glGetVertexAttribfv(index, pname, params) {
  params >>>= 0;
  // N.B. This function may only be called if the vertex attribute was
  // specified using the function glVertexAttrib*f(), otherwise the results
  // are undefined. (GLES3 spec 6.1.12)
  emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
}

var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;

/** @suppress {duplicate } */ function _glGetVertexAttribiv(index, pname, params) {
  params >>>= 0;
  // N.B. This function may only be called if the vertex attribute was
  // specified using the function glVertexAttrib*f(), otherwise the results
  // are undefined. (GLES3 spec 6.1.12)
  emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
}

var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;

/** @suppress {duplicate } */ var _glHint = (x0, x1) => GLctx.hint(x0, x1);

var _emscripten_glHint = _glHint;

/** @suppress {duplicate } */ function _glInvalidateFramebuffer(target, numAttachments, attachments) {
  attachments >>>= 0;
  var list = tempFixedLengthArray[numAttachments];
  for (var i = 0; i < numAttachments; i++) {
    list[i] = HEAP32[(((attachments) + (i * 4)) >>> 2) >>> 0];
  }
  GLctx.invalidateFramebuffer(target, list);
}

var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;

/** @suppress {duplicate } */ function _glInvalidateSubFramebuffer(target, numAttachments, attachments, x, y, width, height) {
  attachments >>>= 0;
  var list = tempFixedLengthArray[numAttachments];
  for (var i = 0; i < numAttachments; i++) {
    list[i] = HEAP32[(((attachments) + (i * 4)) >>> 2) >>> 0];
  }
  GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
}

var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;

/** @suppress {duplicate } */ var _glIsBuffer = buffer => {
  var b = GL.buffers[buffer];
  if (!b) return 0;
  return GLctx.isBuffer(b);
};

var _emscripten_glIsBuffer = _glIsBuffer;

/** @suppress {duplicate } */ var _glIsEnabled = x0 => GLctx.isEnabled(x0);

var _emscripten_glIsEnabled = _glIsEnabled;

/** @suppress {duplicate } */ var _glIsFramebuffer = framebuffer => {
  var fb = GL.framebuffers[framebuffer];
  if (!fb) return 0;
  return GLctx.isFramebuffer(fb);
};

var _emscripten_glIsFramebuffer = _glIsFramebuffer;

/** @suppress {duplicate } */ var _glIsProgram = program => {
  program = GL.programs[program];
  if (!program) return 0;
  return GLctx.isProgram(program);
};

var _emscripten_glIsProgram = _glIsProgram;

/** @suppress {duplicate } */ var _glIsQuery = id => {
  var query = GL.queries[id];
  if (!query) return 0;
  return GLctx.isQuery(query);
};

var _emscripten_glIsQuery = _glIsQuery;

/** @suppress {duplicate } */ var _glIsQueryEXT = id => {
  var query = GL.queries[id];
  if (!query) return 0;
  return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
};

var _emscripten_glIsQueryEXT = _glIsQueryEXT;

/** @suppress {duplicate } */ var _glIsRenderbuffer = renderbuffer => {
  var rb = GL.renderbuffers[renderbuffer];
  if (!rb) return 0;
  return GLctx.isRenderbuffer(rb);
};

var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;

/** @suppress {duplicate } */ var _glIsSampler = id => {
  var sampler = GL.samplers[id];
  if (!sampler) return 0;
  return GLctx.isSampler(sampler);
};

var _emscripten_glIsSampler = _glIsSampler;

/** @suppress {duplicate } */ var _glIsShader = shader => {
  var s = GL.shaders[shader];
  if (!s) return 0;
  return GLctx.isShader(s);
};

var _emscripten_glIsShader = _glIsShader;

/** @suppress {duplicate } */ function _glIsSync(sync) {
  sync >>>= 0;
  return GLctx.isSync(GL.syncs[sync]);
}

var _emscripten_glIsSync = _glIsSync;

/** @suppress {duplicate } */ var _glIsTexture = id => {
  var texture = GL.textures[id];
  if (!texture) return 0;
  return GLctx.isTexture(texture);
};

var _emscripten_glIsTexture = _glIsTexture;

/** @suppress {duplicate } */ var _glIsTransformFeedback = id => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);

var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;

/** @suppress {duplicate } */ var _glIsVertexArray = array => {
  var vao = GL.vaos[array];
  if (!vao) return 0;
  return GLctx.isVertexArray(vao);
};

var _emscripten_glIsVertexArray = _glIsVertexArray;

/** @suppress {duplicate } */ var _glIsVertexArrayOES = _glIsVertexArray;

var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;

/** @suppress {duplicate } */ var _glLineWidth = x0 => GLctx.lineWidth(x0);

var _emscripten_glLineWidth = _glLineWidth;

/** @suppress {duplicate } */ var _glLinkProgram = program => {
  program = GL.programs[program];
  GLctx.linkProgram(program);
  // Invalidate earlier computed uniform->ID mappings, those have now become stale
  program.uniformLocsById = 0;
  // Mark as null-like so that glGetUniformLocation() knows to populate this again.
  program.uniformSizeAndIdsByName = {};
};

var _emscripten_glLinkProgram = _glLinkProgram;

/** @suppress {duplicate } */ var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();

var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;

/** @suppress {duplicate } */ var _glPixelStorei = (pname, param) => {
  if (pname == 3317) {
    GL.unpackAlignment = param;
  } else if (pname == 3314) {
    GL.unpackRowLength = param;
  }
  GLctx.pixelStorei(pname, param);
};

var _emscripten_glPixelStorei = _glPixelStorei;

/** @suppress {duplicate } */ var _glPolygonModeWEBGL = (face, mode) => {
  GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
};

var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;

/** @suppress {duplicate } */ var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

var _emscripten_glPolygonOffset = _glPolygonOffset;

/** @suppress {duplicate } */ var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
  GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
};

var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;

/** @suppress {duplicate } */ function _glProgramBinary(program, binaryFormat, binary, length) {
  binary >>>= 0;
  GL.recordError(1280);
}

var _emscripten_glProgramBinary = _glProgramBinary;

/** @suppress {duplicate } */ var _glProgramParameteri = (program, pname, value) => {
  GL.recordError(1280);
};

/*GL_INVALID_ENUM*/ var _emscripten_glProgramParameteri = _glProgramParameteri;

/** @suppress {duplicate } */ var _glQueryCounterEXT = (id, target) => {
  GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
};

var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;

/** @suppress {duplicate } */ var _glReadBuffer = x0 => GLctx.readBuffer(x0);

var _emscripten_glReadBuffer = _glReadBuffer;

var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
  function roundedToNextMultipleOf(x, y) {
    return (x + y - 1) & -y;
  }
  var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
  var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
  return height * alignedRowSize;
};

var colorChannelsInGlTextureFormat = format => {
  // Micro-optimizations for size: map format to size by subtracting smallest
  // enum value (0x1902) from all values first.  Also omit the most common
  // size value (1) from the list, which is assumed by formats not on the
  // list.
  var colorChannels = {
    // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
    // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
    5: 3,
    6: 4,
    // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
    8: 2,
    29502: 3,
    29504: 4,
    // 0x1903 /* GL_RED */ - 0x1902: 1,
    26917: 2,
    26918: 2,
    // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
    29846: 3,
    29847: 4
  };
  return colorChannels[format - 6402] || 1;
};

var heapObjectForWebGLType = type => {
  // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
  // smaller values for the heap, for shorter generated code size.
  // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
  // (since most types are HEAPU16)
  type -= 5120;
  if (type == 0) return HEAP8;
  if (type == 1) return HEAPU8;
  if (type == 2) return HEAP16;
  if (type == 4) return HEAP32;
  if (type == 6) return HEAPF32;
  if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
  return HEAPU16;
};

var toTypedArrayIndex = (pointer, heap) => pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));

var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
  var heap = heapObjectForWebGLType(type);
  var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
  var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
  return heap.subarray(toTypedArrayIndex(pixels, heap) >>> 0, toTypedArrayIndex(pixels + bytes, heap) >>> 0);
};

/** @suppress {duplicate } */ function _glReadPixels(x, y, width, height, format, type, pixels) {
  pixels >>>= 0;
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelPackBufferBinding) {
      GLctx.readPixels(x, y, width, height, format, type, pixels);
      return;
    }
  }
  var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
  if (!pixelData) {
    GL.recordError(1280);
    /*GL_INVALID_ENUM*/ return;
  }
  GLctx.readPixels(x, y, width, height, format, type, pixelData);
}

var _emscripten_glReadPixels = _glReadPixels;

/** @suppress {duplicate } */ var _glReleaseShaderCompiler = () => {};

// NOP (as allowed by GLES 2.0 spec)
var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;

/** @suppress {duplicate } */ var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);

var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;

/** @suppress {duplicate } */ var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);

var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;

/** @suppress {duplicate } */ var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();

var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;

/** @suppress {duplicate } */ var _glSampleCoverage = (value, invert) => {
  GLctx.sampleCoverage(value, !!invert);
};

var _emscripten_glSampleCoverage = _glSampleCoverage;

/** @suppress {duplicate } */ var _glSamplerParameterf = (sampler, pname, param) => {
  GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
};

var _emscripten_glSamplerParameterf = _glSamplerParameterf;

/** @suppress {duplicate } */ function _glSamplerParameterfv(sampler, pname, params) {
  params >>>= 0;
  var param = HEAPF32[((params) >>> 2) >>> 0];
  GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
}

var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;

/** @suppress {duplicate } */ var _glSamplerParameteri = (sampler, pname, param) => {
  GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
};

var _emscripten_glSamplerParameteri = _glSamplerParameteri;

/** @suppress {duplicate } */ function _glSamplerParameteriv(sampler, pname, params) {
  params >>>= 0;
  var param = HEAP32[((params) >>> 2) >>> 0];
  GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
}

var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;

/** @suppress {duplicate } */ var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

var _emscripten_glScissor = _glScissor;

/** @suppress {duplicate } */ function _glShaderBinary(count, shaders, binaryformat, binary, length) {
  shaders >>>= 0;
  binary >>>= 0;
  GL.recordError(1280);
}

var _emscripten_glShaderBinary = _glShaderBinary;

/** @suppress {duplicate } */ function _glShaderSource(shader, count, string, length) {
  string >>>= 0;
  length >>>= 0;
  var source = GL.getSource(shader, count, string, length);
  GLctx.shaderSource(GL.shaders[shader], source);
}

var _emscripten_glShaderSource = _glShaderSource;

/** @suppress {duplicate } */ var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

var _emscripten_glStencilFunc = _glStencilFunc;

/** @suppress {duplicate } */ var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;

/** @suppress {duplicate } */ var _glStencilMask = x0 => GLctx.stencilMask(x0);

var _emscripten_glStencilMask = _glStencilMask;

/** @suppress {duplicate } */ var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);

var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;

/** @suppress {duplicate } */ var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

var _emscripten_glStencilOp = _glStencilOp;

/** @suppress {duplicate } */ var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;

/** @suppress {duplicate } */ function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
  pixels >>>= 0;
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding) {
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
      return;
    }
  }
  var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
  GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
}

var _emscripten_glTexImage2D = _glTexImage2D;

/** @suppress {duplicate } */ function _glTexImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels) {
  pixels >>>= 0;
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
  } else if (pixels) {
    var heap = heapObjectForWebGLType(type);
    var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height * depth, pixels, internalFormat);
    GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixelData);
  } else {
    GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
  }
}

var _emscripten_glTexImage3D = _glTexImage3D;

/** @suppress {duplicate } */ var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);

var _emscripten_glTexParameterf = _glTexParameterf;

/** @suppress {duplicate } */ function _glTexParameterfv(target, pname, params) {
  params >>>= 0;
  var param = HEAPF32[((params) >>> 2) >>> 0];
  GLctx.texParameterf(target, pname, param);
}

var _emscripten_glTexParameterfv = _glTexParameterfv;

/** @suppress {duplicate } */ var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

var _emscripten_glTexParameteri = _glTexParameteri;

/** @suppress {duplicate } */ function _glTexParameteriv(target, pname, params) {
  params >>>= 0;
  var param = HEAP32[((params) >>> 2) >>> 0];
  GLctx.texParameteri(target, pname, param);
}

var _emscripten_glTexParameteriv = _glTexParameteriv;

/** @suppress {duplicate } */ var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);

var _emscripten_glTexStorage2D = _glTexStorage2D;

/** @suppress {duplicate } */ var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);

var _emscripten_glTexStorage3D = _glTexStorage3D;

/** @suppress {duplicate } */ function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
  pixels >>>= 0;
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding) {
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
      return;
    }
  }
  var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
  GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
}

var _emscripten_glTexSubImage2D = _glTexSubImage2D;

/** @suppress {duplicate } */ function _glTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) {
  pixels >>>= 0;
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
  } else if (pixels) {
    var heap = heapObjectForWebGLType(type);
    GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
  } else {
    GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
  }
}

var _emscripten_glTexSubImage3D = _glTexSubImage3D;

/** @suppress {duplicate } */ function _glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
  varyings >>>= 0;
  program = GL.programs[program];
  var vars = [];
  for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAP32[(((varyings) + (i * 4)) >>> 2) >>> 0]));
  GLctx.transformFeedbackVaryings(program, vars, bufferMode);
}

var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;

/** @suppress {duplicate } */ var _glUniform1f = (location, v0) => {
  GLctx.uniform1f(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1f = _glUniform1f;

var miniTempWebGLFloatBuffers = [];

/** @suppress {duplicate } */ function _glUniform1fv(location, count, value) {
  value >>>= 0;
  if (count <= 288) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 4) >>> 2) >>> 0);
  }
  GLctx.uniform1fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform1fv = _glUniform1fv;

/** @suppress {duplicate } */ var _glUniform1i = (location, v0) => {
  GLctx.uniform1i(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1i = _glUniform1i;

var miniTempWebGLIntBuffers = [];

/** @suppress {duplicate } */ function _glUniform1iv(location, count, value) {
  value >>>= 0;
  if (count <= 288) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 4) >>> 2) >>> 0);
  }
  GLctx.uniform1iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform1iv = _glUniform1iv;

/** @suppress {duplicate } */ var _glUniform1ui = (location, v0) => {
  GLctx.uniform1ui(webglGetUniformLocation(location), v0);
};

var _emscripten_glUniform1ui = _glUniform1ui;

/** @suppress {duplicate } */ function _glUniform1uiv(location, count, value) {
  value >>>= 0;
  count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count);
}

var _emscripten_glUniform1uiv = _glUniform1uiv;

/** @suppress {duplicate } */ var _glUniform2f = (location, v0, v1) => {
  GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2f = _glUniform2f;

/** @suppress {duplicate } */ function _glUniform2fv(location, count, value) {
  value >>>= 0;
  if (count <= 144) {
    // avoid allocation when uploading few enough uniforms
    count *= 2;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 8) >>> 2) >>> 0);
  }
  GLctx.uniform2fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform2fv = _glUniform2fv;

/** @suppress {duplicate } */ var _glUniform2i = (location, v0, v1) => {
  GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2i = _glUniform2i;

/** @suppress {duplicate } */ function _glUniform2iv(location, count, value) {
  value >>>= 0;
  if (count <= 144) {
    // avoid allocation when uploading few enough uniforms
    count *= 2;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 8) >>> 2) >>> 0);
  }
  GLctx.uniform2iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform2iv = _glUniform2iv;

/** @suppress {duplicate } */ var _glUniform2ui = (location, v0, v1) => {
  GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2ui = _glUniform2ui;

/** @suppress {duplicate } */ function _glUniform2uiv(location, count, value) {
  value >>>= 0;
  count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count * 2);
}

var _emscripten_glUniform2uiv = _glUniform2uiv;

/** @suppress {duplicate } */ var _glUniform3f = (location, v0, v1, v2) => {
  GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3f = _glUniform3f;

/** @suppress {duplicate } */ function _glUniform3fv(location, count, value) {
  value >>>= 0;
  if (count <= 96) {
    // avoid allocation when uploading few enough uniforms
    count *= 3;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
      view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 12) >>> 2) >>> 0);
  }
  GLctx.uniform3fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform3fv = _glUniform3fv;

/** @suppress {duplicate } */ var _glUniform3i = (location, v0, v1, v2) => {
  GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3i = _glUniform3i;

/** @suppress {duplicate } */ function _glUniform3iv(location, count, value) {
  value >>>= 0;
  if (count <= 96) {
    // avoid allocation when uploading few enough uniforms
    count *= 3;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
      view[i + 2] = HEAP32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 12) >>> 2) >>> 0);
  }
  GLctx.uniform3iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform3iv = _glUniform3iv;

/** @suppress {duplicate } */ var _glUniform3ui = (location, v0, v1, v2) => {
  GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3ui = _glUniform3ui;

/** @suppress {duplicate } */ function _glUniform3uiv(location, count, value) {
  value >>>= 0;
  count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count * 3);
}

var _emscripten_glUniform3uiv = _glUniform3uiv;

/** @suppress {duplicate } */ var _glUniform4f = (location, v0, v1, v2, v3) => {
  GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4f = _glUniform4f;

/** @suppress {duplicate } */ function _glUniform4fv(location, count, value) {
  value >>>= 0;
  if (count <= 72) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLFloatBuffers[4 * count];
    // hoist the heap out of the loop for size and for pthreads+growth.
    var heap = HEAPF32;
    value = ((value) >>> 2);
    count *= 4;
    for (var i = 0; i < count; i += 4) {
      var dst = value + i;
      view[i] = heap[dst >>> 0];
      view[i + 1] = heap[dst + 1 >>> 0];
      view[i + 2] = heap[dst + 2 >>> 0];
      view[i + 3] = heap[dst + 3 >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 16) >>> 2) >>> 0);
  }
  GLctx.uniform4fv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform4fv = _glUniform4fv;

/** @suppress {duplicate } */ var _glUniform4i = (location, v0, v1, v2, v3) => {
  GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4i = _glUniform4i;

/** @suppress {duplicate } */ function _glUniform4iv(location, count, value) {
  value >>>= 0;
  if (count <= 72) {
    // avoid allocation when uploading few enough uniforms
    count *= 4;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAP32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
      view[i + 2] = HEAP32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
      view[i + 3] = HEAP32[(((value) + (4 * i + 12)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAP32.subarray((((value) >>> 2)) >>> 0, ((value + count * 16) >>> 2) >>> 0);
  }
  GLctx.uniform4iv(webglGetUniformLocation(location), view);
}

var _emscripten_glUniform4iv = _glUniform4iv;

/** @suppress {duplicate } */ var _glUniform4ui = (location, v0, v1, v2, v3) => {
  GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4ui = _glUniform4ui;

/** @suppress {duplicate } */ function _glUniform4uiv(location, count, value) {
  value >>>= 0;
  count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, ((value) >>> 2), count * 4);
}

var _emscripten_glUniform4uiv = _glUniform4uiv;

/** @suppress {duplicate } */ var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
  program = GL.programs[program];
  GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
};

var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;

/** @suppress {duplicate } */ function _glUniformMatrix2fv(location, count, transpose, value) {
  value >>>= 0;
  if (count <= 72) {
    // avoid allocation when uploading few enough uniforms
    count *= 4;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
      view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
      view[i + 3] = HEAPF32[(((value) + (4 * i + 12)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 16) >>> 2) >>> 0);
  }
  GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
}

var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;

/** @suppress {duplicate } */ function _glUniformMatrix2x3fv(location, count, transpose, value) {
  value >>>= 0;
  count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 6);
}

var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;

/** @suppress {duplicate } */ function _glUniformMatrix2x4fv(location, count, transpose, value) {
  value >>>= 0;
  count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 8);
}

var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;

/** @suppress {duplicate } */ function _glUniformMatrix3fv(location, count, transpose, value) {
  value >>>= 0;
  if (count <= 32) {
    // avoid allocation when uploading few enough uniforms
    count *= 9;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 9) {
      view[i] = HEAPF32[(((value) + (4 * i)) >>> 2) >>> 0];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >>> 2) >>> 0];
      view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >>> 2) >>> 0];
      view[i + 3] = HEAPF32[(((value) + (4 * i + 12)) >>> 2) >>> 0];
      view[i + 4] = HEAPF32[(((value) + (4 * i + 16)) >>> 2) >>> 0];
      view[i + 5] = HEAPF32[(((value) + (4 * i + 20)) >>> 2) >>> 0];
      view[i + 6] = HEAPF32[(((value) + (4 * i + 24)) >>> 2) >>> 0];
      view[i + 7] = HEAPF32[(((value) + (4 * i + 28)) >>> 2) >>> 0];
      view[i + 8] = HEAPF32[(((value) + (4 * i + 32)) >>> 2) >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 36) >>> 2) >>> 0);
  }
  GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
}

var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;

/** @suppress {duplicate } */ function _glUniformMatrix3x2fv(location, count, transpose, value) {
  value >>>= 0;
  count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 6);
}

var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;

/** @suppress {duplicate } */ function _glUniformMatrix3x4fv(location, count, transpose, value) {
  value >>>= 0;
  count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 12);
}

var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;

/** @suppress {duplicate } */ function _glUniformMatrix4fv(location, count, transpose, value) {
  value >>>= 0;
  if (count <= 18) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLFloatBuffers[16 * count];
    // hoist the heap out of the loop for size and for pthreads+growth.
    var heap = HEAPF32;
    value = ((value) >>> 2);
    count *= 16;
    for (var i = 0; i < count; i += 16) {
      var dst = value + i;
      view[i] = heap[dst >>> 0];
      view[i + 1] = heap[dst + 1 >>> 0];
      view[i + 2] = heap[dst + 2 >>> 0];
      view[i + 3] = heap[dst + 3 >>> 0];
      view[i + 4] = heap[dst + 4 >>> 0];
      view[i + 5] = heap[dst + 5 >>> 0];
      view[i + 6] = heap[dst + 6 >>> 0];
      view[i + 7] = heap[dst + 7 >>> 0];
      view[i + 8] = heap[dst + 8 >>> 0];
      view[i + 9] = heap[dst + 9 >>> 0];
      view[i + 10] = heap[dst + 10 >>> 0];
      view[i + 11] = heap[dst + 11 >>> 0];
      view[i + 12] = heap[dst + 12 >>> 0];
      view[i + 13] = heap[dst + 13 >>> 0];
      view[i + 14] = heap[dst + 14 >>> 0];
      view[i + 15] = heap[dst + 15 >>> 0];
    }
  } else {
    var view = HEAPF32.subarray((((value) >>> 2)) >>> 0, ((value + count * 64) >>> 2) >>> 0);
  }
  GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
}

var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;

/** @suppress {duplicate } */ function _glUniformMatrix4x2fv(location, count, transpose, value) {
  value >>>= 0;
  count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 8);
}

var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;

/** @suppress {duplicate } */ function _glUniformMatrix4x3fv(location, count, transpose, value) {
  value >>>= 0;
  count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >>> 2), count * 12);
}

var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;

/** @suppress {duplicate } */ var _glUseProgram = program => {
  program = GL.programs[program];
  GLctx.useProgram(program);
  // Record the currently active program so that we can access the uniform
  // mapping table of that program.
  GLctx.currentProgram = program;
};

var _emscripten_glUseProgram = _glUseProgram;

/** @suppress {duplicate } */ var _glValidateProgram = program => {
  GLctx.validateProgram(GL.programs[program]);
};

var _emscripten_glValidateProgram = _glValidateProgram;

/** @suppress {duplicate } */ var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);

var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;

/** @suppress {duplicate } */ function _glVertexAttrib1fv(index, v) {
  v >>>= 0;
  GLctx.vertexAttrib1f(index, HEAPF32[v >>> 2]);
}

var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;

/** @suppress {duplicate } */ var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);

var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;

/** @suppress {duplicate } */ function _glVertexAttrib2fv(index, v) {
  v >>>= 0;
  GLctx.vertexAttrib2f(index, HEAPF32[v >>> 2], HEAPF32[v + 4 >>> 2]);
}

var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;

/** @suppress {duplicate } */ var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);

var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;

/** @suppress {duplicate } */ function _glVertexAttrib3fv(index, v) {
  v >>>= 0;
  GLctx.vertexAttrib3f(index, HEAPF32[v >>> 2], HEAPF32[v + 4 >>> 2], HEAPF32[v + 8 >>> 2]);
}

var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;

/** @suppress {duplicate } */ var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;

/** @suppress {duplicate } */ function _glVertexAttrib4fv(index, v) {
  v >>>= 0;
  GLctx.vertexAttrib4f(index, HEAPF32[v >>> 2], HEAPF32[v + 4 >>> 2], HEAPF32[v + 8 >>> 2], HEAPF32[v + 12 >>> 2]);
}

var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;

/** @suppress {duplicate } */ var _glVertexAttribDivisor = (index, divisor) => {
  GLctx.vertexAttribDivisor(index, divisor);
};

var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;

/** @suppress {duplicate } */ var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;

/** @suppress {duplicate } */ var _glVertexAttribDivisorARB = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorARB = _glVertexAttribDivisorARB;

/** @suppress {duplicate } */ var _glVertexAttribDivisorEXT = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorEXT = _glVertexAttribDivisorEXT;

/** @suppress {duplicate } */ var _glVertexAttribDivisorNV = _glVertexAttribDivisor;

var _emscripten_glVertexAttribDivisorNV = _glVertexAttribDivisorNV;

/** @suppress {duplicate } */ var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;

/** @suppress {duplicate } */ function _glVertexAttribI4iv(index, v) {
  v >>>= 0;
  GLctx.vertexAttribI4i(index, HEAP32[v >>> 2], HEAP32[v + 4 >>> 2], HEAP32[v + 8 >>> 2], HEAP32[v + 12 >>> 2]);
}

var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;

/** @suppress {duplicate } */ var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;

/** @suppress {duplicate } */ function _glVertexAttribI4uiv(index, v) {
  v >>>= 0;
  GLctx.vertexAttribI4ui(index, HEAPU32[v >>> 2], HEAPU32[v + 4 >>> 2], HEAPU32[v + 8 >>> 2], HEAPU32[v + 12 >>> 2]);
}

var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;

/** @suppress {duplicate } */ function _glVertexAttribIPointer(index, size, type, stride, ptr) {
  ptr >>>= 0;
  GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
}

var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;

/** @suppress {duplicate } */ function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
  ptr >>>= 0;
  GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
}

var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;

/** @suppress {duplicate } */ var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);

var _emscripten_glViewport = _glViewport;

/** @suppress {duplicate } */ function _glWaitSync(sync, flags, timeout) {
  sync >>>= 0;
  // See WebGL2 vs GLES3 difference on GL_TIMEOUT_IGNORED above (https://www.khronos.org/registry/webgl/specs/latest/2.0/#5.15)
  timeout = Number(timeout);
  GLctx.waitSync(GL.syncs[sync], flags, timeout);
}

var _emscripten_glWaitSync = _glWaitSync;

var IDBStore = {
  indexedDB() {
    if (typeof indexedDB != "undefined") return indexedDB;
    var ret = null;
    if (typeof window == "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    assert(ret, "IDBStore used, but indexedDB not supported");
    return ret;
  },
  DB_VERSION: 22,
  DB_STORE_NAME: "FILE_DATA",
  dbs: {},
  blobs: [ 0 ],
  getDB(name, callback) {
    // check the cache first
    var db = IDBStore.dbs[name];
    if (db) {
      return callback(null, db);
    }
    var req;
    try {
      req = IDBStore.indexedDB().open(name, IDBStore.DB_VERSION);
    } catch (e) {
      return callback(e);
    }
    req.onupgradeneeded = e => {
      var db = /** @type {IDBDatabase} */ (e.target.result);
      var transaction = e.target.transaction;
      var fileStore;
      if (db.objectStoreNames.contains(IDBStore.DB_STORE_NAME)) {
        fileStore = transaction.objectStore(IDBStore.DB_STORE_NAME);
      } else {
        fileStore = db.createObjectStore(IDBStore.DB_STORE_NAME);
      }
    };
    req.onsuccess = () => {
      db = /** @type {IDBDatabase} */ (req.result);
      // add to the cache
      IDBStore.dbs[name] = db;
      callback(null, db);
    };
    req.onerror = function(event) {
      callback(event.target.error || "unknown error");
      event.preventDefault();
    };
  },
  getStore(dbName, type, callback) {
    IDBStore.getDB(dbName, (error, db) => {
      if (error) return callback(error);
      var transaction = db.transaction([ IDBStore.DB_STORE_NAME ], type);
      transaction.onerror = event => {
        callback(event.target.error || "unknown error");
        event.preventDefault();
      };
      var store = transaction.objectStore(IDBStore.DB_STORE_NAME);
      callback(null, store);
    });
  },
  getFile(dbName, id, callback) {
    IDBStore.getStore(dbName, "readonly", (err, store) => {
      if (err) return callback(err);
      var req = store.get(id);
      req.onsuccess = event => {
        var result = event.target.result;
        if (!result) {
          return callback(`file ${id} not found`);
        }
        return callback(null, result);
      };
      req.onerror = callback;
    });
  },
  setFile(dbName, id, data, callback) {
    IDBStore.getStore(dbName, "readwrite", (err, store) => {
      if (err) return callback(err);
      var req = store.put(data, id);
      req.onsuccess = event => callback();
      req.onerror = callback;
    });
  },
  deleteFile(dbName, id, callback) {
    IDBStore.getStore(dbName, "readwrite", (err, store) => {
      if (err) return callback(err);
      var req = store.delete(id);
      req.onsuccess = event => callback();
      req.onerror = callback;
    });
  },
  existsFile(dbName, id, callback) {
    IDBStore.getStore(dbName, "readonly", (err, store) => {
      if (err) return callback(err);
      var req = store.count(id);
      req.onsuccess = event => callback(null, event.target.result > 0);
      req.onerror = callback;
    });
  },
  clearStore(dbName, callback) {
    IDBStore.getStore(dbName, "readwrite", (err, store) => {
      if (err) return callback(err);
      var req = store.clear();
      req.onsuccess = event => callback();
      req.onerror = callback;
    });
  }
};

function _emscripten_idb_delete(db, id, perror) {
  db >>>= 0;
  id >>>= 0;
  perror >>>= 0;
  throw "Please compile your program with async support in order to use synchronous operations like emscripten_idb_delete, etc.";
}

function _emscripten_idb_exists(db, id, pexists, perror) {
  db >>>= 0;
  id >>>= 0;
  pexists >>>= 0;
  perror >>>= 0;
  throw "Please compile your program with async support in order to use synchronous operations like emscripten_idb_exists, etc.";
}

function _emscripten_idb_load(db, id, pbuffer, pnum, perror) {
  db >>>= 0;
  id >>>= 0;
  pbuffer >>>= 0;
  pnum >>>= 0;
  perror >>>= 0;
  throw "Please compile your program with async support in order to use synchronous operations like emscripten_idb_load, etc.";
}

function _emscripten_idb_store(db, id, ptr, num, perror) {
  db >>>= 0;
  id >>>= 0;
  ptr >>>= 0;
  perror >>>= 0;
  throw "Please compile your program with async support in order to use synchronous operations like emscripten_idb_store, etc.";
}

function _emscripten_is_webgl_context_lost(contextHandle) {
  contextHandle >>>= 0;
  return !GL.contexts[contextHandle] || GL.contexts[contextHandle].GLctx.isContextLost();
}

var reallyNegative = x => x < 0 || (x === 0 && (1 / x) === -Infinity);

var convertI32PairToI53 = (lo, hi) => {
  // This function should not be getting called with too large unsigned numbers
  // in high part (if hi >= 0x7FFFFFFFF, one should have been calling
  // convertU32PairToI53())
  assert(hi === (hi | 0));
  return (lo >>> 0) + hi * 4294967296;
};

var convertU32PairToI53 = (lo, hi) => (lo >>> 0) + (hi >>> 0) * 4294967296;

var reSign = (value, bits) => {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits - 1)) : // abs is needed if bits == 32
  Math.pow(2, bits - 1);
  // for huge values, we can hit the precision limit and always get true here.
  // so don't do that but, in general there is no perfect solution here. With
  // 64-bit ints, we get rounding and errors
  // TODO: In i64 mode 1, resign the two parts separately and safely
  if (value >= half && (bits <= 32 || value > half)) {
    // Cannot bitshift half, as it may be at the limit of the bits JS uses in
    // bitshifts
    value = -2 * half + value;
  }
  return value;
};

var unSign = (value, bits) => {
  if (value >= 0) {
    return value;
  }
  // Need some trickery, since if bits == 32, we are right at the limit of the
  // bits JS uses in bitshifts
  return bits <= 32 ? 2 * Math.abs(1 << (bits - 1)) + value : Math.pow(2, bits) + value;
};

var strLen = ptr => {
  var end = ptr;
  while (HEAPU8[end >>> 0]) ++end;
  return end - ptr;
};

var formatString = (format, varargs) => {
  assert((varargs & 3) === 0);
  var textIndex = format;
  var argIndex = varargs;
  // This must be called before reading a double or i64 vararg. It will bump the pointer properly.
  // It also does an assert on i32 values, so it's nice to call it before all varargs calls.
  function prepVararg(ptr, type) {
    if (type === "double" || type === "i64") {
      // move so the load is aligned
      if (ptr & 7) {
        assert((ptr & 7) === 4);
        ptr += 4;
      }
    } else {
      assert((ptr & 3) === 0);
    }
    return ptr;
  }
  function getNextArg(type) {
    // NOTE: Explicitly ignoring type safety. Otherwise this fails:
    //       int x = 4; printf("%c\n", (char)x);
    var ret;
    argIndex = prepVararg(argIndex, type);
    if (type === "double") {
      ret = HEAPF64[((argIndex) >>> 3) >>> 0];
      argIndex += 8;
    } else if (type == "i64") {
      ret = [ HEAP32[((argIndex) >>> 2) >>> 0], HEAP32[(((argIndex) + (4)) >>> 2) >>> 0] ];
      argIndex += 8;
    } else {
      assert((argIndex & 3) === 0);
      type = "i32";
      // varargs are always i32, i64, or double
      ret = HEAP32[((argIndex) >>> 2) >>> 0];
      argIndex += 4;
    }
    return ret;
  }
  var ret = [];
  var curr, next, currArg;
  while (1) {
    var startTextIndex = textIndex;
    curr = HEAP8[textIndex >>> 0];
    if (curr === 0) break;
    next = HEAP8[textIndex + 1 >>> 0];
    if (curr == 37) {
      // Handle flags.
      var flagAlwaysSigned = false;
      var flagLeftAlign = false;
      var flagAlternative = false;
      var flagZeroPad = false;
      var flagPadSign = false;
      flagsLoop: while (1) {
        switch (next) {
         case 43:
          flagAlwaysSigned = true;
          break;

         case 45:
          flagLeftAlign = true;
          break;

         case 35:
          flagAlternative = true;
          break;

         case 48:
          if (flagZeroPad) {
            break flagsLoop;
          } else {
            flagZeroPad = true;
            break;
          }

         case 32:
          flagPadSign = true;
          break;

         default:
          break flagsLoop;
        }
        textIndex++;
        next = HEAP8[textIndex + 1 >>> 0];
      }
      // Handle width.
      var width = 0;
      if (next == 42) {
        width = getNextArg("i32");
        textIndex++;
        next = HEAP8[textIndex + 1 >>> 0];
      } else {
        while (next >= 48 && next <= 57) {
          width = width * 10 + (next - 48);
          textIndex++;
          next = HEAP8[textIndex + 1 >>> 0];
        }
      }
      // Handle precision.
      var precisionSet = false, precision = -1;
      if (next == 46) {
        precision = 0;
        precisionSet = true;
        textIndex++;
        next = HEAP8[textIndex + 1 >>> 0];
        if (next == 42) {
          precision = getNextArg("i32");
          textIndex++;
        } else {
          while (1) {
            var precisionChr = HEAP8[textIndex + 1 >>> 0];
            if (precisionChr < 48 || precisionChr > 57) break;
            precision = precision * 10 + (precisionChr - 48);
            textIndex++;
          }
        }
        next = HEAP8[textIndex + 1 >>> 0];
      }
      if (precision < 0) {
        precision = 6;
        // Standard default.
        precisionSet = false;
      }
      // Handle integer sizes. WARNING: These assume a 32-bit architecture!
      var argSize;
      switch (String.fromCharCode(next)) {
       case "h":
        var nextNext = HEAP8[textIndex + 2 >>> 0];
        if (nextNext == 104) {
          textIndex++;
          argSize = 1;
        } else // char (actually i32 in varargs)
        {
          argSize = 2;
        }
        // short (actually i32 in varargs)
        break;

       case "l":
        var nextNext = HEAP8[textIndex + 2 >>> 0];
        if (nextNext == 108) {
          textIndex++;
          argSize = 8;
        } else // long long
        {
          argSize = 4;
        }
        // long
        break;

       case "L":
       // long long
        case "q":
       // int64_t
        case "j":
        // intmax_t
        argSize = 8;
        break;

       case "z":
       // size_t
        case "t":
       // ptrdiff_t
        case "I":
        // signed ptrdiff_t or unsigned size_t
        argSize = 4;
        break;

       default:
        argSize = null;
      }
      if (argSize) textIndex++;
      next = HEAP8[textIndex + 1 >>> 0];
      // Handle type specifier.
      switch (String.fromCharCode(next)) {
       case "d":
       case "i":
       case "u":
       case "o":
       case "x":
       case "X":
       case "p":
        {
          // Integer.
          var signed = next == 100 || next == 105;
          argSize = argSize || 4;
          currArg = getNextArg("i" + (argSize * 8));
          var argText;
          // Flatten i64-1 [low, high] into a (slightly rounded) double
          if (argSize == 8) {
            currArg = next == 117 ? convertU32PairToI53(currArg[0], currArg[1]) : convertI32PairToI53(currArg[0], currArg[1]);
          }
          // Truncate to requested size.
          if (argSize <= 4) {
            var limit = Math.pow(256, argSize) - 1;
            currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
          }
          // Format the number.
          var currAbsArg = Math.abs(currArg);
          var prefix = "";
          if (next == 100 || next == 105) {
            argText = reSign(currArg, 8 * argSize).toString(10);
          } else if (next == 117) {
            argText = unSign(currArg, 8 * argSize).toString(10);
            currArg = Math.abs(currArg);
          } else if (next == 111) {
            argText = (flagAlternative ? "0" : "") + currAbsArg.toString(8);
          } else if (next == 120 || next == 88) {
            prefix = (flagAlternative && currArg != 0) ? "0x" : "";
            if (currArg < 0) {
              // Represent negative numbers in hex as 2's complement.
              currArg = -currArg;
              argText = (currAbsArg - 1).toString(16);
              var buffer = [];
              for (var i = 0; i < argText.length; i++) {
                buffer.push((15 - parseInt(argText[i], 16)).toString(16));
              }
              argText = buffer.join("");
              while (argText.length < argSize * 2) argText = "f" + argText;
            } else {
              argText = currAbsArg.toString(16);
            }
            if (next == 88) {
              prefix = prefix.toUpperCase();
              argText = argText.toUpperCase();
            }
          } else if (next == 112) {
            if (currAbsArg === 0) {
              argText = "(nil)";
            } else {
              prefix = "0x";
              argText = currAbsArg.toString(16);
            }
          }
          if (precisionSet) {
            while (argText.length < precision) {
              argText = "0" + argText;
            }
          }
          // Add sign if needed
          if (currArg >= 0) {
            if (flagAlwaysSigned) {
              prefix = "+" + prefix;
            } else if (flagPadSign) {
              prefix = " " + prefix;
            }
          }
          // Move sign to prefix so we zero-pad after the sign
          if (argText.charAt(0) == "-") {
            prefix = "-" + prefix;
            argText = argText.substr(1);
          }
          // Add padding.
          while (prefix.length + argText.length < width) {
            if (flagLeftAlign) {
              argText += " ";
            } else {
              if (flagZeroPad) {
                argText = "0" + argText;
              } else {
                prefix = " " + prefix;
              }
            }
          }
          // Insert the result into the buffer.
          argText = prefix + argText;
          argText.split("").forEach(chr => ret.push(chr.charCodeAt(0)));
          break;
        }

       case "f":
       case "F":
       case "e":
       case "E":
       case "g":
       case "G":
        {
          // Float.
          currArg = getNextArg("double");
          var argText;
          if (isNaN(currArg)) {
            argText = "nan";
            flagZeroPad = false;
          } else if (!isFinite(currArg)) {
            argText = (currArg < 0 ? "-" : "") + "inf";
            flagZeroPad = false;
          } else {
            var isGeneral = false;
            var effectivePrecision = Math.min(precision, 20);
            // Convert g/G to f/F or e/E, as per:
            // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
            if (next == 103 || next == 71) {
              isGeneral = true;
              precision = precision || 1;
              var exponent = parseInt(currArg.toExponential(effectivePrecision).split("e")[1], 10);
              if (precision > exponent && exponent >= -4) {
                next = ((next == 103) ? "f" : "F").charCodeAt(0);
                precision -= exponent + 1;
              } else {
                next = ((next == 103) ? "e" : "E").charCodeAt(0);
                precision--;
              }
              effectivePrecision = Math.min(precision, 20);
            }
            if (next == 101 || next == 69) {
              argText = currArg.toExponential(effectivePrecision);
              // Make sure the exponent has at least 2 digits.
              if (/[eE][-+]\d$/.test(argText)) {
                argText = argText.slice(0, -1) + "0" + argText.slice(-1);
              }
            } else if (next == 102 || next == 70) {
              argText = currArg.toFixed(effectivePrecision);
              if (currArg === 0 && reallyNegative(currArg)) {
                argText = "-" + argText;
              }
            }
            var parts = argText.split("e");
            if (isGeneral && !flagAlternative) {
              // Discard trailing zeros and periods.
              while (parts[0].length > 1 && parts[0].includes(".") && (parts[0].slice(-1) == "0" || parts[0].slice(-1) == ".")) {
                parts[0] = parts[0].slice(0, -1);
              }
            } else {
              // Make sure we have a period in alternative mode.
              if (flagAlternative && argText.indexOf(".") == -1) parts[0] += ".";
              // Zero pad until required precision.
              while (precision > effectivePrecision++) parts[0] += "0";
            }
            argText = parts[0] + (parts.length > 1 ? "e" + parts[1] : "");
            // Capitalize 'E' if needed.
            if (next == 69) argText = argText.toUpperCase();
            // Add sign.
            if (currArg >= 0) {
              if (flagAlwaysSigned) {
                argText = "+" + argText;
              } else if (flagPadSign) {
                argText = " " + argText;
              }
            }
          }
          // Add padding.
          while (argText.length < width) {
            if (flagLeftAlign) {
              argText += " ";
            } else {
              if (flagZeroPad && (argText[0] == "-" || argText[0] == "+")) {
                argText = argText[0] + "0" + argText.slice(1);
              } else {
                argText = (flagZeroPad ? "0" : " ") + argText;
              }
            }
          }
          // Adjust case.
          if (next < 97) argText = argText.toUpperCase();
          // Insert the result into the buffer.
          argText.split("").forEach(chr => ret.push(chr.charCodeAt(0)));
          break;
        }

       case "s":
        {
          // String.
          var arg = getNextArg("i8*");
          var argLength = arg ? strLen(arg) : "(null)".length;
          if (precisionSet) argLength = Math.min(argLength, precision);
          if (!flagLeftAlign) {
            while (argLength < width--) {
              ret.push(32);
            }
          }
          if (arg) {
            for (var i = 0; i < argLength; i++) {
              ret.push(HEAPU8[arg++ >>> 0]);
            }
          } else {
            ret = ret.concat(intArrayFromString("(null)".substr(0, argLength), true));
          }
          if (flagLeftAlign) {
            while (argLength < width--) {
              ret.push(32);
            }
          }
          break;
        }

       case "c":
        {
          // Character.
          if (flagLeftAlign) ret.push(getNextArg("i8"));
          while (--width > 0) {
            ret.push(32);
          }
          if (!flagLeftAlign) ret.push(getNextArg("i8"));
          break;
        }

       case "n":
        {
          // Write the length written so far to the next parameter.
          var ptr = getNextArg("i32*");
          HEAP32[((ptr) >>> 2) >>> 0] = ret.length;
          break;
        }

       case "%":
        {
          // Literal percent sign.
          ret.push(curr);
          break;
        }

       default:
        {
          // Unknown specifiers remain untouched.
          for (var i = startTextIndex; i < textIndex + 2; i++) {
            ret.push(HEAP8[i >>> 0]);
          }
        }
      }
      textIndex += 2;
    } else // TODO: Support a/A (hex float) and m (last error) specifiers.
    // TODO: Support %1${specifier} for arg selection.
    {
      ret.push(curr);
      textIndex += 1;
    }
  }
  return ret;
};

function jsStackTrace() {
  return (new Error).stack.toString();
}

/** @param {number=} flags */ function getCallstack(flags) {
  var callstack = jsStackTrace();
  // Find the symbols in the callstack that corresponds to the functions that
  // report callstack information, and remove everything up to these from the
  // output.
  var iThisFunc = callstack.lastIndexOf("_emscripten_log");
  var iThisFunc2 = callstack.lastIndexOf("_emscripten_get_callstack");
  var iNextLine = callstack.indexOf("\n", Math.max(iThisFunc, iThisFunc2)) + 1;
  callstack = callstack.slice(iNextLine);
  // If user requested to see the original source stack, but no source map
  // information is available, just fall back to showing the JS stack.
  if (flags & 8 && typeof emscripten_source_map == "undefined") {
    warnOnce('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.');
    flags ^= 8;
    flags |= 16;
  }
  // Process all lines:
  var lines = callstack.split("\n");
  callstack = "";
  // New FF30 with column info: extract components of form:
  // '       Object._main@http://server.com:4324:12'
  var newFirefoxRe = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");
  // Old FF without column info: extract components of form:
  // '       Object._main@http://server.com:4324'
  var firefoxRe = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?");
  // Extract components of form:
  // '    at Object._main (http://server.com/file.html:4324:12)'
  var chromeRe = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
  for (var l in lines) {
    var line = lines[l];
    var symbolName = "";
    var file = "";
    var lineno = 0;
    var column = 0;
    var parts = chromeRe.exec(line);
    if (parts && parts.length == 5) {
      symbolName = parts[1];
      file = parts[2];
      lineno = parts[3];
      column = parts[4];
    } else {
      parts = newFirefoxRe.exec(line) || firefoxRe.exec(line);
      if (parts && parts.length >= 4) {
        symbolName = parts[1];
        file = parts[2];
        lineno = parts[3];
        // Old Firefox doesn't carry column information, but in new FF30, it
        // is present. See https://bugzilla.mozilla.org/show_bug.cgi?id=762556
        column = parts[4] | 0;
      } else {
        // Was not able to extract this line for demangling/sourcemapping
        // purposes. Output it as-is.
        callstack += line + "\n";
        continue;
      }
    }
    var haveSourceMap = false;
    if (flags & 8) {
      var orig = emscripten_source_map.originalPositionFor({
        line: lineno,
        column
      });
      haveSourceMap = orig?.source;
      if (haveSourceMap) {
        if (flags & 64) {
          orig.source = orig.source.substring(orig.source.replace(/\\/g, "/").lastIndexOf("/") + 1);
        }
        callstack += `    at ${symbolName} (${orig.source}:${orig.line}:${orig.column})\n`;
      }
    }
    if ((flags & 16) || !haveSourceMap) {
      if (flags & 64) {
        file = file.substring(file.replace(/\\/g, "/").lastIndexOf("/") + 1);
      }
      callstack += (haveSourceMap ? (`     = ${symbolName}`) : (`    at ${symbolName}`)) + ` (${file}:${lineno}:${column})\n`;
    }
  }
  // Trim extra whitespace at the end of the output.
  callstack = callstack.replace(/\s+$/, "");
  return callstack;
}

var emscriptenLog = (flags, str) => {
  if (flags & 24) {
    str = str.replace(/\s+$/, "");
    // Ensure the message and the callstack are joined cleanly with exactly one newline.
    str += (str.length > 0 ? "\n" : "") + getCallstack(flags);
  }
  if (flags & 1) {
    if (flags & 4) {
      console.error(str);
    } else if (flags & 2) {
      console.warn(str);
    } else if (flags & 512) {
      console.info(str);
    } else if (flags & 256) {
      console.debug(str);
    } else {
      console.log(str);
    }
  } else if (flags & 6) {
    err(str);
  } else {
    out(str);
  }
};

function _emscripten_log(flags, format, varargs) {
  format >>>= 0;
  varargs >>>= 0;
  var result = formatString(format, varargs);
  var str = UTF8ArrayToString(result);
  emscriptenLog(flags, str);
}

var _emscripten_pause_main_loop = () => {
  MainLoop.pause();
};

var _emscripten_performance_now = () => performance.now();

var _emscripten_request_animation_frame = function(cb, userData) {
  cb >>>= 0;
  userData >>>= 0;
  return requestAnimationFrame(timeStamp => getWasmTableEntry(cb)(timeStamp, userData));
};

var getHeapMax = () => // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
// full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
// for any code that deals with heap sizes, which would require special
// casing all heap size related code to treat 0 specially.
4294901760;

var growMemory = size => {
  var b = wasmMemory.buffer;
  var pages = ((size - b.byteLength + 65535) / 65536) | 0;
  try {
    // round size grow request up to wasm page size (fixed 64KB per spec)
    wasmMemory.grow(pages);
    // .grow() takes a delta compared to the previous size
    updateMemoryViews();
    return 1;
  } /*success*/ catch (e) {
    err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
  }
};

// implicit 0 return to save code size (caller will cast "undefined" into 0
// anyhow)
function _emscripten_resize_heap(requestedSize) {
  requestedSize >>>= 0;
  var oldSize = HEAPU8.length;
  // With multithreaded builds, races can happen (another thread might increase the size
  // in between), so return a failure, and let the caller retry.
  assert(requestedSize > oldSize);
  // Memory resize rules:
  // 1.  Always increase heap size to at least the requested size, rounded up
  //     to next page multiple.
  // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
  //     geometrically: increase the heap size according to
  //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
  //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
  // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
  //     linearly: increase the heap size by at least
  //     MEMORY_GROWTH_LINEAR_STEP bytes.
  // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
  //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
  // 4.  If we were unable to allocate as much memory, it may be due to
  //     over-eager decision to excessively reserve due to (3) above.
  //     Hence if an allocation fails, cut down on the amount of excess
  //     growth, in an attempt to succeed to perform a smaller allocation.
  // A limit is set for how much we can grow. We should not exceed that
  // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
  var maxHeapSize = getHeapMax();
  if (requestedSize > maxHeapSize) {
    err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
    return false;
  }
  // Loop through potential heap size increases. If we attempt a too eager
  // reservation that fails, cut down on the attempted size and reserve a
  // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
    // ensure geometric growth
    // but limit overreserving (default to capping at +96MB overgrowth at most)
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
    var replacement = growMemory(newSize);
    if (replacement) {
      return true;
    }
  }
  err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
  return false;
}

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
  func >>>= 0;
  var iterFunc = getWasmTableEntry(func);
  setMainLoop(iterFunc, fps, simulateInfiniteLoop);
}

var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  JSEvents.uiEvent ||= _malloc(36);
  target = findEventTarget(target);
  var uiEventHandlerFunc = (e = event) => {
    if (e.target != target) {
      // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
      // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
      // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
      // causing a new scroll, etc..
      return;
    }
    var b = document.body;
    // Take document.body to a variable, Closure compiler does not outline access to it on its own.
    if (!b) {
      // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
      return;
    }
    var uiEvent = JSEvents.uiEvent;
    HEAP32[((uiEvent) >>> 2) >>> 0] = 0;
    // always zero for resize and scroll
    HEAP32[(((uiEvent) + (4)) >>> 2) >>> 0] = b.clientWidth;
    HEAP32[(((uiEvent) + (8)) >>> 2) >>> 0] = b.clientHeight;
    HEAP32[(((uiEvent) + (12)) >>> 2) >>> 0] = innerWidth;
    HEAP32[(((uiEvent) + (16)) >>> 2) >>> 0] = innerHeight;
    HEAP32[(((uiEvent) + (20)) >>> 2) >>> 0] = outerWidth;
    HEAP32[(((uiEvent) + (24)) >>> 2) >>> 0] = outerHeight;
    HEAP32[(((uiEvent) + (28)) >>> 2) >>> 0] = pageXOffset | 0;
    // scroll offsets are float
    HEAP32[(((uiEvent) + (32)) >>> 2) >>> 0] = pageYOffset | 0;
    if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    callbackfunc,
    handlerFunc: uiEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_resize_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
  target >>>= 0;
  userData >>>= 0;
  callbackfunc >>>= 0;
  targetThread >>>= 0;
  return registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
}

var stackAlloc = sz => __emscripten_stack_alloc(sz);

var stringToUTF8OnStack = str => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8(str, ret, size);
  return ret;
};

var _setNetworkCallback = (event, userData, callback) => {
  function _callback(data) {
    try {
      if (event === "error") {
        var sp = stackSave();
        var msg = stringToUTF8OnStack(data[2]);
        getWasmTableEntry(callback)(data[0], data[1], msg, userData);
        stackRestore(sp);
      } else {
        getWasmTableEntry(callback)(data, userData);
      }
    } catch (e) {
      if (!(e instanceof ExitStatus)) {
        if (e && typeof e == "object" && e.stack) err("exception thrown: " + [ e, e.stack ]);
        throw e;
      }
    }
  }
  // FIXME(sbc): This has no corresponding Pop so will currently keep the
  // runtime alive indefinitely.
  Module["websocket"]["on"](event, callback ? _callback : null);
};

function _emscripten_set_socket_close_callback(userData, callback) {
  userData >>>= 0;
  callback >>>= 0;
  _setNetworkCallback("close", userData, callback);
}

function _emscripten_set_socket_connection_callback(userData, callback) {
  userData >>>= 0;
  callback >>>= 0;
  _setNetworkCallback("connection", userData, callback);
}

function _emscripten_set_socket_error_callback(userData, callback) {
  userData >>>= 0;
  callback >>>= 0;
  _setNetworkCallback("error", userData, callback);
}

function _emscripten_set_socket_listen_callback(userData, callback) {
  userData >>>= 0;
  callback >>>= 0;
  _setNetworkCallback("listen", userData, callback);
}

function _emscripten_set_socket_message_callback(userData, callback) {
  userData >>>= 0;
  callback >>>= 0;
  _setNetworkCallback("message", userData, callback);
}

function _emscripten_set_socket_open_callback(userData, callback) {
  userData >>>= 0;
  callback >>>= 0;
  _setNetworkCallback("open", userData, callback);
}

var _emscripten_set_timeout = function(cb, msecs, userData) {
  cb >>>= 0;
  userData >>>= 0;
  return safeSetTimeout(() => getWasmTableEntry(cb)(userData), msecs);
};

var fillMouseEventData = (eventStruct, e, target) => {
  assert(eventStruct % 4 == 0);
  HEAPF64[((eventStruct) >>> 3) >>> 0] = e.timeStamp;
  var idx = ((eventStruct) >>> 2);
  HEAP32[idx + 2 >>> 0] = e.screenX;
  HEAP32[idx + 3 >>> 0] = e.screenY;
  HEAP32[idx + 4 >>> 0] = e.clientX;
  HEAP32[idx + 5 >>> 0] = e.clientY;
  HEAP8[eventStruct + 24 >>> 0] = e.ctrlKey;
  HEAP8[eventStruct + 25 >>> 0] = e.shiftKey;
  HEAP8[eventStruct + 26 >>> 0] = e.altKey;
  HEAP8[eventStruct + 27 >>> 0] = e.metaKey;
  HEAP16[idx * 2 + 14 >>> 0] = e.button;
  HEAP16[idx * 2 + 15 >>> 0] = e.buttons;
  HEAP32[idx + 8 >>> 0] = e["movementX"];
  HEAP32[idx + 9 >>> 0] = e["movementY"];
  // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
  var rect = getBoundingClientRect(target);
  HEAP32[idx + 10 >>> 0] = e.clientX - (rect.left | 0);
  HEAP32[idx + 11 >>> 0] = e.clientY - (rect.top | 0);
};

var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  JSEvents.wheelEvent ||= _malloc(96);
  // The DOM Level 3 events spec event 'wheel'
  var wheelHandlerFunc = (e = event) => {
    var wheelEvent = JSEvents.wheelEvent;
    fillMouseEventData(wheelEvent, e, target);
    HEAPF64[(((wheelEvent) + (64)) >>> 3) >>> 0] = e["deltaX"];
    HEAPF64[(((wheelEvent) + (72)) >>> 3) >>> 0] = e["deltaY"];
    HEAPF64[(((wheelEvent) + (80)) >>> 3) >>> 0] = e["deltaZ"];
    HEAP32[(((wheelEvent) + (88)) >>> 2) >>> 0] = e["deltaMode"];
    if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls: true,
    eventTypeString,
    callbackfunc,
    handlerFunc: wheelHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
  target >>>= 0;
  userData >>>= 0;
  callbackfunc >>>= 0;
  targetThread >>>= 0;
  target = findEventTarget(target);
  if (!target) return -4;
  if (typeof target.onwheel != "undefined") {
    return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
  } else {
    return -1;
  }
}

var _emscripten_sleep = () => {
  throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep";
};

var webglPowerPreferences = [ "default", "low-power", "high-performance" ];

var findCanvasEventTarget = findEventTarget;

/** @suppress {duplicate } */ function _emscripten_webgl_do_create_context(target, attributes) {
  target >>>= 0;
  attributes >>>= 0;
  assert(attributes);
  var attr32 = ((attributes) >>> 2);
  var powerPreference = HEAP32[attr32 + (8 >> 2) >>> 0];
  var contextAttributes = {
    "alpha": !!HEAP8[attributes + 0 >>> 0],
    "depth": !!HEAP8[attributes + 1 >>> 0],
    "stencil": !!HEAP8[attributes + 2 >>> 0],
    "antialias": !!HEAP8[attributes + 3 >>> 0],
    "premultipliedAlpha": !!HEAP8[attributes + 4 >>> 0],
    "preserveDrawingBuffer": !!HEAP8[attributes + 5 >>> 0],
    "powerPreference": webglPowerPreferences[powerPreference],
    "failIfMajorPerformanceCaveat": !!HEAP8[attributes + 12 >>> 0],
    // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
    majorVersion: HEAP32[attr32 + (16 >> 2) >>> 0],
    minorVersion: HEAP32[attr32 + (20 >> 2) >>> 0],
    enableExtensionsByDefault: HEAP8[attributes + 24 >>> 0],
    explicitSwapControl: HEAP8[attributes + 25 >>> 0],
    proxyContextToMainThread: HEAP32[attr32 + (28 >> 2) >>> 0],
    renderViaOffscreenBackBuffer: HEAP8[attributes + 32 >>> 0]
  };
  var canvas = findCanvasEventTarget(target);
  if (!canvas) {
    return 0;
  }
  if (contextAttributes.explicitSwapControl) {
    return 0;
  }
  var contextHandle = GL.createContext(canvas, contextAttributes);
  return contextHandle;
}

var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

function _emscripten_webgl_destroy_context(contextHandle) {
  contextHandle >>>= 0;
  if (GL.currentContext == contextHandle) GL.currentContext = 0;
  GL.deleteContext(contextHandle);
}

function _emscripten_webgl_get_context_attributes(c, a) {
  c >>>= 0;
  a >>>= 0;
  if (!a) return -5;
  c = GL.contexts[c];
  if (!c) return -3;
  var t = c.GLctx;
  if (!t) return -3;
  t = t.getContextAttributes();
  HEAP8[a >>> 0] = t.alpha;
  HEAP8[(a) + (1) >>> 0] = t.depth;
  HEAP8[(a) + (2) >>> 0] = t.stencil;
  HEAP8[(a) + (3) >>> 0] = t.antialias;
  HEAP8[(a) + (4) >>> 0] = t.premultipliedAlpha;
  HEAP8[(a) + (5) >>> 0] = t.preserveDrawingBuffer;
  var power = t["powerPreference"] && webglPowerPreferences.indexOf(t["powerPreference"]);
  HEAP32[(((a) + (8)) >>> 2) >>> 0] = power;
  HEAP8[(a) + (12) >>> 0] = t.failIfMajorPerformanceCaveat;
  HEAP32[(((a) + (16)) >>> 2) >>> 0] = c.version;
  HEAP32[(((a) + (20)) >>> 2) >>> 0] = 0;
  HEAP8[(a) + (24) >>> 0] = c.attributes.enableExtensionsByDefault;
  return 0;
}

function _emscripten_webgl_make_context_current(contextHandle) {
  contextHandle >>>= 0;
  var success = GL.makeContextCurrent(contextHandle);
  return success ? 0 : -5;
}

var ENV = {};

var getExecutableName = () => thisProgram || "./this.program";

var getEnvStrings = () => {
  if (!getEnvStrings.strings) {
    // Default values.
    // Browser language detection #8751
    var lang = ((typeof navigator == "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
    var env = {
      "USER": "web_user",
      "LOGNAME": "web_user",
      "PATH": "/",
      "PWD": "/",
      "HOME": "/home/web_user",
      "LANG": lang,
      "_": getExecutableName()
    };
    // Apply the user-provided values, if any.
    for (var x in ENV) {
      // x is a key in ENV; if ENV[x] is undefined, that means it was
      // explicitly set to be so. We allow user code to do that to
      // force variables with default values to remain unset.
      if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
    }
    var strings = [];
    for (var x in env) {
      strings.push(`${x}=${env[x]}`);
    }
    getEnvStrings.strings = strings;
  }
  return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
    HEAP8[buffer++ >>> 0] = str.charCodeAt(i);
  }
  // Null-terminate the string
  HEAP8[buffer >>> 0] = 0;
};

var _environ_get = function(__environ, environ_buf) {
  __environ >>>= 0;
  environ_buf >>>= 0;
  var bufSize = 0;
  getEnvStrings().forEach((string, i) => {
    var ptr = environ_buf + bufSize;
    HEAPU32[(((__environ) + (i * 4)) >>> 2) >>> 0] = ptr;
    stringToAscii(string, ptr);
    bufSize += string.length + 1;
  });
  return 0;
};

var _environ_sizes_get = function(penviron_count, penviron_buf_size) {
  penviron_count >>>= 0;
  penviron_buf_size >>>= 0;
  var strings = getEnvStrings();
  HEAPU32[((penviron_count) >>> 2) >>> 0] = strings.length;
  var bufSize = 0;
  strings.forEach(string => bufSize += string.length + 1);
  HEAPU32[((penviron_buf_size) >>> 2) >>> 0] = bufSize;
  return 0;
};

function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_fdstat_get(fd, pbuf) {
  pbuf >>>= 0;
  try {
    var rightsBase = 0;
    var rightsInheriting = 0;
    var flags = 0;
    {
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
    }
    HEAP8[pbuf >>> 0] = type;
    HEAP16[(((pbuf) + (2)) >>> 1) >>> 0] = flags;
    HEAP64[(((pbuf) + (8)) >>> 3)] = BigInt(rightsBase);
    HEAP64[(((pbuf) + (16)) >>> 3)] = BigInt(rightsInheriting);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

/** @param {number=} offset */ var doReadv = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[((iov) >>> 2) >>> 0];
    var len = HEAPU32[(((iov) + (4)) >>> 2) >>> 0];
    iov += 8;
    var curr = FS.read(stream, HEAP8, ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) break;
    // nothing more to read
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};

function _fd_read(fd, iov, iovcnt, pnum) {
  iov >>>= 0;
  iovcnt >>>= 0;
  pnum >>>= 0;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doReadv(stream, iov, iovcnt);
    HEAPU32[((pnum) >>> 2) >>> 0] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_seek(fd, offset, whence, newOffset) {
  offset = bigintToI53Checked(offset);
  newOffset >>>= 0;
  try {
    if (isNaN(offset)) return 61;
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.llseek(stream, offset, whence);
    HEAP64[((newOffset) >>> 3)] = BigInt(stream.position);
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    // reset readdir state
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_sync(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    if (stream.stream_ops?.fsync) {
      return stream.stream_ops.fsync(stream);
    }
    return 0;
  } // we can't do anything synchronously; the in-memory FS is already synced to
  catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

/** @param {number=} offset */ var doWritev = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[((iov) >>> 2) >>> 0];
    var len = HEAPU32[(((iov) + (4)) >>> 2) >>> 0];
    iov += 8;
    var curr = FS.write(stream, HEAP8, ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) {
      // No more space to write.
      break;
    }
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};

function _fd_write(fd, iov, iovcnt, pnum) {
  iov >>>= 0;
  iovcnt >>>= 0;
  pnum >>>= 0;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doWritev(stream, iov, iovcnt);
    HEAPU32[((pnum) >>> 2) >>> 0] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _getentropy(buffer, size) {
  buffer >>>= 0;
  size >>>= 0;
  randomFill(HEAPU8.subarray(buffer >>> 0, buffer + size >>> 0));
  return 0;
}

function _llvm_eh_typeid_for(type) {
  type >>>= 0;
  return type;
}

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

embind_init_charCodes();

BindingError = Module["BindingError"] = class BindingError extends Error {
  constructor(message) {
    super(message);
    this.name = "BindingError";
  }
};

InternalError = Module["InternalError"] = class InternalError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalError";
  }
};

init_ClassHandle();

init_RegisteredPointer();

UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");

init_emval();

Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;

Module["pauseMainLoop"] = MainLoop.pause;

Module["resumeMainLoop"] = MainLoop.resume;

MainLoop.init();

// exports
Module["requestFullscreen"] = Browser.requestFullscreen;

Module["requestFullScreen"] = Browser.requestFullScreen;

Module["setCanvasSize"] = Browser.setCanvasSize;

Module["getUserMedia"] = Browser.getUserMedia;

Module["createContext"] = Browser.createContext;

var preloadedImages = {};

var preloadedAudios = {};

for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

// Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
for (/**@suppress{duplicate}*/ var i = 0; i <= 288; ++i) {
  miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
}

var miniTempWebGLIntBuffersStorage = new Int32Array(288);

// Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
for (/**@suppress{duplicate}*/ var i = 0; i <= 288; ++i) {
  miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
}

function checkIncomingModuleAPI() {
  ignoredModuleProp("fetchSettings");
}

var wasmImports = {
  /** @export */ __assert_fail: ___assert_fail,
  /** @export */ __asyncjs__qt_asyncify_suspend_js,
  /** @export */ __call_sighandler: ___call_sighandler,
  /** @export */ __cxa_begin_catch: ___cxa_begin_catch,
  /** @export */ __cxa_end_catch: ___cxa_end_catch,
  /** @export */ __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
  /** @export */ __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
  /** @export */ __cxa_rethrow: ___cxa_rethrow,
  /** @export */ __cxa_throw: ___cxa_throw,
  /** @export */ __resumeException: ___resumeException,
  /** @export */ __syscall_chmod: ___syscall_chmod,
  /** @export */ __syscall_faccessat: ___syscall_faccessat,
  /** @export */ __syscall_fchmod: ___syscall_fchmod,
  /** @export */ __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */ __syscall_fstat64: ___syscall_fstat64,
  /** @export */ __syscall_ftruncate64: ___syscall_ftruncate64,
  /** @export */ __syscall_getcwd: ___syscall_getcwd,
  /** @export */ __syscall_getdents64: ___syscall_getdents64,
  /** @export */ __syscall_ioctl: ___syscall_ioctl,
  /** @export */ __syscall_lstat64: ___syscall_lstat64,
  /** @export */ __syscall_mkdirat: ___syscall_mkdirat,
  /** @export */ __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */ __syscall_openat: ___syscall_openat,
  /** @export */ __syscall_readlinkat: ___syscall_readlinkat,
  /** @export */ __syscall_renameat: ___syscall_renameat,
  /** @export */ __syscall_rmdir: ___syscall_rmdir,
  /** @export */ __syscall_stat64: ___syscall_stat64,
  /** @export */ __syscall_symlink: ___syscall_symlink,
  /** @export */ __syscall_truncate64: ___syscall_truncate64,
  /** @export */ __syscall_unlinkat: ___syscall_unlinkat,
  /** @export */ __syscall_utimensat: ___syscall_utimensat,
  /** @export */ _abort_js: __abort_js,
  /** @export */ _embind_register_bigint: __embind_register_bigint,
  /** @export */ _embind_register_bool: __embind_register_bool,
  /** @export */ _embind_register_class: __embind_register_class,
  /** @export */ _embind_register_class_constructor: __embind_register_class_constructor,
  /** @export */ _embind_register_class_function: __embind_register_class_function,
  /** @export */ _embind_register_emval: __embind_register_emval,
  /** @export */ _embind_register_float: __embind_register_float,
  /** @export */ _embind_register_function: __embind_register_function,
  /** @export */ _embind_register_integer: __embind_register_integer,
  /** @export */ _embind_register_memory_view: __embind_register_memory_view,
  /** @export */ _embind_register_std_string: __embind_register_std_string,
  /** @export */ _embind_register_std_wstring: __embind_register_std_wstring,
  /** @export */ _embind_register_void: __embind_register_void,
  /** @export */ _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
  /** @export */ _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
  /** @export */ _emscripten_throw_longjmp: __emscripten_throw_longjmp,
  /** @export */ _emval_as: __emval_as,
  /** @export */ _emval_call: __emval_call,
  /** @export */ _emval_call_method: __emval_call_method,
  /** @export */ _emval_decref: __emval_decref,
  /** @export */ _emval_delete: __emval_delete,
  /** @export */ _emval_equals: __emval_equals,
  /** @export */ _emval_get_global: __emval_get_global,
  /** @export */ _emval_get_method_caller: __emval_get_method_caller,
  /** @export */ _emval_get_module_property: __emval_get_module_property,
  /** @export */ _emval_get_property: __emval_get_property,
  /** @export */ _emval_incref: __emval_incref,
  /** @export */ _emval_instanceof: __emval_instanceof,
  /** @export */ _emval_new_array: __emval_new_array,
  /** @export */ _emval_new_cstring: __emval_new_cstring,
  /** @export */ _emval_new_object: __emval_new_object,
  /** @export */ _emval_not: __emval_not,
  /** @export */ _emval_run_destructors: __emval_run_destructors,
  /** @export */ _emval_set_property: __emval_set_property,
  /** @export */ _emval_take_value: __emval_take_value,
  /** @export */ _localtime_js: __localtime_js,
  /** @export */ _mktime_js: __mktime_js,
  /** @export */ _mmap_js: __mmap_js,
  /** @export */ _munmap_js: __munmap_js,
  /** @export */ _tzset_js: __tzset_js,
  /** @export */ emscripten_async_call: _emscripten_async_call,
  /** @export */ emscripten_cancel_animation_frame: _emscripten_cancel_animation_frame,
  /** @export */ emscripten_clear_timeout: _emscripten_clear_timeout,
  /** @export */ emscripten_date_now: _emscripten_date_now,
  /** @export */ emscripten_err: _emscripten_err,
  /** @export */ emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */ emscripten_get_now: _emscripten_get_now,
  /** @export */ emscripten_glActiveTexture: _emscripten_glActiveTexture,
  /** @export */ emscripten_glAttachShader: _emscripten_glAttachShader,
  /** @export */ emscripten_glBeginQuery: _emscripten_glBeginQuery,
  /** @export */ emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
  /** @export */ emscripten_glBeginTransformFeedback: _emscripten_glBeginTransformFeedback,
  /** @export */ emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
  /** @export */ emscripten_glBindBuffer: _emscripten_glBindBuffer,
  /** @export */ emscripten_glBindBufferBase: _emscripten_glBindBufferBase,
  /** @export */ emscripten_glBindBufferRange: _emscripten_glBindBufferRange,
  /** @export */ emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
  /** @export */ emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
  /** @export */ emscripten_glBindSampler: _emscripten_glBindSampler,
  /** @export */ emscripten_glBindTexture: _emscripten_glBindTexture,
  /** @export */ emscripten_glBindTransformFeedback: _emscripten_glBindTransformFeedback,
  /** @export */ emscripten_glBindVertexArray: _emscripten_glBindVertexArray,
  /** @export */ emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
  /** @export */ emscripten_glBlendColor: _emscripten_glBlendColor,
  /** @export */ emscripten_glBlendEquation: _emscripten_glBlendEquation,
  /** @export */ emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
  /** @export */ emscripten_glBlendFunc: _emscripten_glBlendFunc,
  /** @export */ emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
  /** @export */ emscripten_glBlitFramebuffer: _emscripten_glBlitFramebuffer,
  /** @export */ emscripten_glBufferData: _emscripten_glBufferData,
  /** @export */ emscripten_glBufferSubData: _emscripten_glBufferSubData,
  /** @export */ emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
  /** @export */ emscripten_glClear: _emscripten_glClear,
  /** @export */ emscripten_glClearBufferfi: _emscripten_glClearBufferfi,
  /** @export */ emscripten_glClearBufferfv: _emscripten_glClearBufferfv,
  /** @export */ emscripten_glClearBufferiv: _emscripten_glClearBufferiv,
  /** @export */ emscripten_glClearBufferuiv: _emscripten_glClearBufferuiv,
  /** @export */ emscripten_glClearColor: _emscripten_glClearColor,
  /** @export */ emscripten_glClearDepthf: _emscripten_glClearDepthf,
  /** @export */ emscripten_glClearStencil: _emscripten_glClearStencil,
  /** @export */ emscripten_glClientWaitSync: _emscripten_glClientWaitSync,
  /** @export */ emscripten_glClipControlEXT: _emscripten_glClipControlEXT,
  /** @export */ emscripten_glColorMask: _emscripten_glColorMask,
  /** @export */ emscripten_glCompileShader: _emscripten_glCompileShader,
  /** @export */ emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
  /** @export */ emscripten_glCompressedTexImage3D: _emscripten_glCompressedTexImage3D,
  /** @export */ emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
  /** @export */ emscripten_glCompressedTexSubImage3D: _emscripten_glCompressedTexSubImage3D,
  /** @export */ emscripten_glCopyBufferSubData: _emscripten_glCopyBufferSubData,
  /** @export */ emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
  /** @export */ emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
  /** @export */ emscripten_glCopyTexSubImage3D: _emscripten_glCopyTexSubImage3D,
  /** @export */ emscripten_glCreateProgram: _emscripten_glCreateProgram,
  /** @export */ emscripten_glCreateShader: _emscripten_glCreateShader,
  /** @export */ emscripten_glCullFace: _emscripten_glCullFace,
  /** @export */ emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
  /** @export */ emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
  /** @export */ emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
  /** @export */ emscripten_glDeleteQueries: _emscripten_glDeleteQueries,
  /** @export */ emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
  /** @export */ emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
  /** @export */ emscripten_glDeleteSamplers: _emscripten_glDeleteSamplers,
  /** @export */ emscripten_glDeleteShader: _emscripten_glDeleteShader,
  /** @export */ emscripten_glDeleteSync: _emscripten_glDeleteSync,
  /** @export */ emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
  /** @export */ emscripten_glDeleteTransformFeedbacks: _emscripten_glDeleteTransformFeedbacks,
  /** @export */ emscripten_glDeleteVertexArrays: _emscripten_glDeleteVertexArrays,
  /** @export */ emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
  /** @export */ emscripten_glDepthFunc: _emscripten_glDepthFunc,
  /** @export */ emscripten_glDepthMask: _emscripten_glDepthMask,
  /** @export */ emscripten_glDepthRangef: _emscripten_glDepthRangef,
  /** @export */ emscripten_glDetachShader: _emscripten_glDetachShader,
  /** @export */ emscripten_glDisable: _emscripten_glDisable,
  /** @export */ emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
  /** @export */ emscripten_glDrawArrays: _emscripten_glDrawArrays,
  /** @export */ emscripten_glDrawArraysInstanced: _emscripten_glDrawArraysInstanced,
  /** @export */ emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
  /** @export */ emscripten_glDrawArraysInstancedARB: _emscripten_glDrawArraysInstancedARB,
  /** @export */ emscripten_glDrawArraysInstancedEXT: _emscripten_glDrawArraysInstancedEXT,
  /** @export */ emscripten_glDrawArraysInstancedNV: _emscripten_glDrawArraysInstancedNV,
  /** @export */ emscripten_glDrawBuffers: _emscripten_glDrawBuffers,
  /** @export */ emscripten_glDrawBuffersEXT: _emscripten_glDrawBuffersEXT,
  /** @export */ emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
  /** @export */ emscripten_glDrawElements: _emscripten_glDrawElements,
  /** @export */ emscripten_glDrawElementsInstanced: _emscripten_glDrawElementsInstanced,
  /** @export */ emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
  /** @export */ emscripten_glDrawElementsInstancedARB: _emscripten_glDrawElementsInstancedARB,
  /** @export */ emscripten_glDrawElementsInstancedEXT: _emscripten_glDrawElementsInstancedEXT,
  /** @export */ emscripten_glDrawElementsInstancedNV: _emscripten_glDrawElementsInstancedNV,
  /** @export */ emscripten_glDrawRangeElements: _emscripten_glDrawRangeElements,
  /** @export */ emscripten_glEnable: _emscripten_glEnable,
  /** @export */ emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
  /** @export */ emscripten_glEndQuery: _emscripten_glEndQuery,
  /** @export */ emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
  /** @export */ emscripten_glEndTransformFeedback: _emscripten_glEndTransformFeedback,
  /** @export */ emscripten_glFenceSync: _emscripten_glFenceSync,
  /** @export */ emscripten_glFinish: _emscripten_glFinish,
  /** @export */ emscripten_glFlush: _emscripten_glFlush,
  /** @export */ emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
  /** @export */ emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
  /** @export */ emscripten_glFramebufferTextureLayer: _emscripten_glFramebufferTextureLayer,
  /** @export */ emscripten_glFrontFace: _emscripten_glFrontFace,
  /** @export */ emscripten_glGenBuffers: _emscripten_glGenBuffers,
  /** @export */ emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
  /** @export */ emscripten_glGenQueries: _emscripten_glGenQueries,
  /** @export */ emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
  /** @export */ emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
  /** @export */ emscripten_glGenSamplers: _emscripten_glGenSamplers,
  /** @export */ emscripten_glGenTextures: _emscripten_glGenTextures,
  /** @export */ emscripten_glGenTransformFeedbacks: _emscripten_glGenTransformFeedbacks,
  /** @export */ emscripten_glGenVertexArrays: _emscripten_glGenVertexArrays,
  /** @export */ emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
  /** @export */ emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
  /** @export */ emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
  /** @export */ emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
  /** @export */ emscripten_glGetActiveUniformBlockName: _emscripten_glGetActiveUniformBlockName,
  /** @export */ emscripten_glGetActiveUniformBlockiv: _emscripten_glGetActiveUniformBlockiv,
  /** @export */ emscripten_glGetActiveUniformsiv: _emscripten_glGetActiveUniformsiv,
  /** @export */ emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
  /** @export */ emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
  /** @export */ emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
  /** @export */ emscripten_glGetBufferParameteri64v: _emscripten_glGetBufferParameteri64v,
  /** @export */ emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
  /** @export */ emscripten_glGetError: _emscripten_glGetError,
  /** @export */ emscripten_glGetFloatv: _emscripten_glGetFloatv,
  /** @export */ emscripten_glGetFragDataLocation: _emscripten_glGetFragDataLocation,
  /** @export */ emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
  /** @export */ emscripten_glGetInteger64i_v: _emscripten_glGetInteger64i_v,
  /** @export */ emscripten_glGetInteger64v: _emscripten_glGetInteger64v,
  /** @export */ emscripten_glGetIntegeri_v: _emscripten_glGetIntegeri_v,
  /** @export */ emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
  /** @export */ emscripten_glGetInternalformativ: _emscripten_glGetInternalformativ,
  /** @export */ emscripten_glGetProgramBinary: _emscripten_glGetProgramBinary,
  /** @export */ emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
  /** @export */ emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
  /** @export */ emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
  /** @export */ emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
  /** @export */ emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
  /** @export */ emscripten_glGetQueryObjectuiv: _emscripten_glGetQueryObjectuiv,
  /** @export */ emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
  /** @export */ emscripten_glGetQueryiv: _emscripten_glGetQueryiv,
  /** @export */ emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
  /** @export */ emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
  /** @export */ emscripten_glGetSamplerParameterfv: _emscripten_glGetSamplerParameterfv,
  /** @export */ emscripten_glGetSamplerParameteriv: _emscripten_glGetSamplerParameteriv,
  /** @export */ emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
  /** @export */ emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
  /** @export */ emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
  /** @export */ emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
  /** @export */ emscripten_glGetString: _emscripten_glGetString,
  /** @export */ emscripten_glGetStringi: _emscripten_glGetStringi,
  /** @export */ emscripten_glGetSynciv: _emscripten_glGetSynciv,
  /** @export */ emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
  /** @export */ emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
  /** @export */ emscripten_glGetTransformFeedbackVarying: _emscripten_glGetTransformFeedbackVarying,
  /** @export */ emscripten_glGetUniformBlockIndex: _emscripten_glGetUniformBlockIndex,
  /** @export */ emscripten_glGetUniformIndices: _emscripten_glGetUniformIndices,
  /** @export */ emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
  /** @export */ emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
  /** @export */ emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
  /** @export */ emscripten_glGetUniformuiv: _emscripten_glGetUniformuiv,
  /** @export */ emscripten_glGetVertexAttribIiv: _emscripten_glGetVertexAttribIiv,
  /** @export */ emscripten_glGetVertexAttribIuiv: _emscripten_glGetVertexAttribIuiv,
  /** @export */ emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
  /** @export */ emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
  /** @export */ emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
  /** @export */ emscripten_glHint: _emscripten_glHint,
  /** @export */ emscripten_glInvalidateFramebuffer: _emscripten_glInvalidateFramebuffer,
  /** @export */ emscripten_glInvalidateSubFramebuffer: _emscripten_glInvalidateSubFramebuffer,
  /** @export */ emscripten_glIsBuffer: _emscripten_glIsBuffer,
  /** @export */ emscripten_glIsEnabled: _emscripten_glIsEnabled,
  /** @export */ emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
  /** @export */ emscripten_glIsProgram: _emscripten_glIsProgram,
  /** @export */ emscripten_glIsQuery: _emscripten_glIsQuery,
  /** @export */ emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
  /** @export */ emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
  /** @export */ emscripten_glIsSampler: _emscripten_glIsSampler,
  /** @export */ emscripten_glIsShader: _emscripten_glIsShader,
  /** @export */ emscripten_glIsSync: _emscripten_glIsSync,
  /** @export */ emscripten_glIsTexture: _emscripten_glIsTexture,
  /** @export */ emscripten_glIsTransformFeedback: _emscripten_glIsTransformFeedback,
  /** @export */ emscripten_glIsVertexArray: _emscripten_glIsVertexArray,
  /** @export */ emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
  /** @export */ emscripten_glLineWidth: _emscripten_glLineWidth,
  /** @export */ emscripten_glLinkProgram: _emscripten_glLinkProgram,
  /** @export */ emscripten_glPauseTransformFeedback: _emscripten_glPauseTransformFeedback,
  /** @export */ emscripten_glPixelStorei: _emscripten_glPixelStorei,
  /** @export */ emscripten_glPolygonModeWEBGL: _emscripten_glPolygonModeWEBGL,
  /** @export */ emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
  /** @export */ emscripten_glPolygonOffsetClampEXT: _emscripten_glPolygonOffsetClampEXT,
  /** @export */ emscripten_glProgramBinary: _emscripten_glProgramBinary,
  /** @export */ emscripten_glProgramParameteri: _emscripten_glProgramParameteri,
  /** @export */ emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
  /** @export */ emscripten_glReadBuffer: _emscripten_glReadBuffer,
  /** @export */ emscripten_glReadPixels: _emscripten_glReadPixels,
  /** @export */ emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
  /** @export */ emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
  /** @export */ emscripten_glRenderbufferStorageMultisample: _emscripten_glRenderbufferStorageMultisample,
  /** @export */ emscripten_glResumeTransformFeedback: _emscripten_glResumeTransformFeedback,
  /** @export */ emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
  /** @export */ emscripten_glSamplerParameterf: _emscripten_glSamplerParameterf,
  /** @export */ emscripten_glSamplerParameterfv: _emscripten_glSamplerParameterfv,
  /** @export */ emscripten_glSamplerParameteri: _emscripten_glSamplerParameteri,
  /** @export */ emscripten_glSamplerParameteriv: _emscripten_glSamplerParameteriv,
  /** @export */ emscripten_glScissor: _emscripten_glScissor,
  /** @export */ emscripten_glShaderBinary: _emscripten_glShaderBinary,
  /** @export */ emscripten_glShaderSource: _emscripten_glShaderSource,
  /** @export */ emscripten_glStencilFunc: _emscripten_glStencilFunc,
  /** @export */ emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
  /** @export */ emscripten_glStencilMask: _emscripten_glStencilMask,
  /** @export */ emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
  /** @export */ emscripten_glStencilOp: _emscripten_glStencilOp,
  /** @export */ emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
  /** @export */ emscripten_glTexImage2D: _emscripten_glTexImage2D,
  /** @export */ emscripten_glTexImage3D: _emscripten_glTexImage3D,
  /** @export */ emscripten_glTexParameterf: _emscripten_glTexParameterf,
  /** @export */ emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
  /** @export */ emscripten_glTexParameteri: _emscripten_glTexParameteri,
  /** @export */ emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
  /** @export */ emscripten_glTexStorage2D: _emscripten_glTexStorage2D,
  /** @export */ emscripten_glTexStorage3D: _emscripten_glTexStorage3D,
  /** @export */ emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
  /** @export */ emscripten_glTexSubImage3D: _emscripten_glTexSubImage3D,
  /** @export */ emscripten_glTransformFeedbackVaryings: _emscripten_glTransformFeedbackVaryings,
  /** @export */ emscripten_glUniform1f: _emscripten_glUniform1f,
  /** @export */ emscripten_glUniform1fv: _emscripten_glUniform1fv,
  /** @export */ emscripten_glUniform1i: _emscripten_glUniform1i,
  /** @export */ emscripten_glUniform1iv: _emscripten_glUniform1iv,
  /** @export */ emscripten_glUniform1ui: _emscripten_glUniform1ui,
  /** @export */ emscripten_glUniform1uiv: _emscripten_glUniform1uiv,
  /** @export */ emscripten_glUniform2f: _emscripten_glUniform2f,
  /** @export */ emscripten_glUniform2fv: _emscripten_glUniform2fv,
  /** @export */ emscripten_glUniform2i: _emscripten_glUniform2i,
  /** @export */ emscripten_glUniform2iv: _emscripten_glUniform2iv,
  /** @export */ emscripten_glUniform2ui: _emscripten_glUniform2ui,
  /** @export */ emscripten_glUniform2uiv: _emscripten_glUniform2uiv,
  /** @export */ emscripten_glUniform3f: _emscripten_glUniform3f,
  /** @export */ emscripten_glUniform3fv: _emscripten_glUniform3fv,
  /** @export */ emscripten_glUniform3i: _emscripten_glUniform3i,
  /** @export */ emscripten_glUniform3iv: _emscripten_glUniform3iv,
  /** @export */ emscripten_glUniform3ui: _emscripten_glUniform3ui,
  /** @export */ emscripten_glUniform3uiv: _emscripten_glUniform3uiv,
  /** @export */ emscripten_glUniform4f: _emscripten_glUniform4f,
  /** @export */ emscripten_glUniform4fv: _emscripten_glUniform4fv,
  /** @export */ emscripten_glUniform4i: _emscripten_glUniform4i,
  /** @export */ emscripten_glUniform4iv: _emscripten_glUniform4iv,
  /** @export */ emscripten_glUniform4ui: _emscripten_glUniform4ui,
  /** @export */ emscripten_glUniform4uiv: _emscripten_glUniform4uiv,
  /** @export */ emscripten_glUniformBlockBinding: _emscripten_glUniformBlockBinding,
  /** @export */ emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
  /** @export */ emscripten_glUniformMatrix2x3fv: _emscripten_glUniformMatrix2x3fv,
  /** @export */ emscripten_glUniformMatrix2x4fv: _emscripten_glUniformMatrix2x4fv,
  /** @export */ emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
  /** @export */ emscripten_glUniformMatrix3x2fv: _emscripten_glUniformMatrix3x2fv,
  /** @export */ emscripten_glUniformMatrix3x4fv: _emscripten_glUniformMatrix3x4fv,
  /** @export */ emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
  /** @export */ emscripten_glUniformMatrix4x2fv: _emscripten_glUniformMatrix4x2fv,
  /** @export */ emscripten_glUniformMatrix4x3fv: _emscripten_glUniformMatrix4x3fv,
  /** @export */ emscripten_glUseProgram: _emscripten_glUseProgram,
  /** @export */ emscripten_glValidateProgram: _emscripten_glValidateProgram,
  /** @export */ emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
  /** @export */ emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
  /** @export */ emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
  /** @export */ emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
  /** @export */ emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
  /** @export */ emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
  /** @export */ emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
  /** @export */ emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
  /** @export */ emscripten_glVertexAttribDivisor: _emscripten_glVertexAttribDivisor,
  /** @export */ emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
  /** @export */ emscripten_glVertexAttribDivisorARB: _emscripten_glVertexAttribDivisorARB,
  /** @export */ emscripten_glVertexAttribDivisorEXT: _emscripten_glVertexAttribDivisorEXT,
  /** @export */ emscripten_glVertexAttribDivisorNV: _emscripten_glVertexAttribDivisorNV,
  /** @export */ emscripten_glVertexAttribI4i: _emscripten_glVertexAttribI4i,
  /** @export */ emscripten_glVertexAttribI4iv: _emscripten_glVertexAttribI4iv,
  /** @export */ emscripten_glVertexAttribI4ui: _emscripten_glVertexAttribI4ui,
  /** @export */ emscripten_glVertexAttribI4uiv: _emscripten_glVertexAttribI4uiv,
  /** @export */ emscripten_glVertexAttribIPointer: _emscripten_glVertexAttribIPointer,
  /** @export */ emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
  /** @export */ emscripten_glViewport: _emscripten_glViewport,
  /** @export */ emscripten_glWaitSync: _emscripten_glWaitSync,
  /** @export */ emscripten_idb_delete: _emscripten_idb_delete,
  /** @export */ emscripten_idb_exists: _emscripten_idb_exists,
  /** @export */ emscripten_idb_load: _emscripten_idb_load,
  /** @export */ emscripten_idb_store: _emscripten_idb_store,
  /** @export */ emscripten_is_webgl_context_lost: _emscripten_is_webgl_context_lost,
  /** @export */ emscripten_log: _emscripten_log,
  /** @export */ emscripten_pause_main_loop: _emscripten_pause_main_loop,
  /** @export */ emscripten_performance_now: _emscripten_performance_now,
  /** @export */ emscripten_request_animation_frame: _emscripten_request_animation_frame,
  /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */ emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */ emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */ emscripten_set_socket_close_callback: _emscripten_set_socket_close_callback,
  /** @export */ emscripten_set_socket_connection_callback: _emscripten_set_socket_connection_callback,
  /** @export */ emscripten_set_socket_error_callback: _emscripten_set_socket_error_callback,
  /** @export */ emscripten_set_socket_listen_callback: _emscripten_set_socket_listen_callback,
  /** @export */ emscripten_set_socket_message_callback: _emscripten_set_socket_message_callback,
  /** @export */ emscripten_set_socket_open_callback: _emscripten_set_socket_open_callback,
  /** @export */ emscripten_set_timeout: _emscripten_set_timeout,
  /** @export */ emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */ emscripten_sleep: _emscripten_sleep,
  /** @export */ emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */ emscripten_webgl_destroy_context: _emscripten_webgl_destroy_context,
  /** @export */ emscripten_webgl_get_context_attributes: _emscripten_webgl_get_context_attributes,
  /** @export */ emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */ environ_get: _environ_get,
  /** @export */ environ_sizes_get: _environ_sizes_get,
  /** @export */ exit: _exit,
  /** @export */ fd_close: _fd_close,
  /** @export */ fd_fdstat_get: _fd_fdstat_get,
  /** @export */ fd_read: _fd_read,
  /** @export */ fd_seek: _fd_seek,
  /** @export */ fd_sync: _fd_sync,
  /** @export */ fd_write: _fd_write,
  /** @export */ getentropy: _getentropy,
  /** @export */ invoke_dii,
  /** @export */ invoke_diii,
  /** @export */ invoke_diiii,
  /** @export */ invoke_diiiii,
  /** @export */ invoke_fi,
  /** @export */ invoke_i,
  /** @export */ invoke_ii,
  /** @export */ invoke_iid,
  /** @export */ invoke_iii,
  /** @export */ invoke_iiii,
  /** @export */ invoke_iiiif,
  /** @export */ invoke_iiiii,
  /** @export */ invoke_iiiiii,
  /** @export */ invoke_iiiiiii,
  /** @export */ invoke_iiiiiiif,
  /** @export */ invoke_iiiiiiii,
  /** @export */ invoke_iiiiiiiii,
  /** @export */ invoke_iiiiiiiiii,
  /** @export */ invoke_iiiiiiiiiii,
  /** @export */ invoke_iiij,
  /** @export */ invoke_iij,
  /** @export */ invoke_iiji,
  /** @export */ invoke_iijii,
  /** @export */ invoke_iijiii,
  /** @export */ invoke_iijji,
  /** @export */ invoke_ij,
  /** @export */ invoke_iji,
  /** @export */ invoke_ji,
  /** @export */ invoke_jii,
  /** @export */ invoke_jiii,
  /** @export */ invoke_jiiiiiiii,
  /** @export */ invoke_jiij,
  /** @export */ invoke_jiiji,
  /** @export */ invoke_jij,
  /** @export */ invoke_jj,
  /** @export */ invoke_v,
  /** @export */ invoke_vdiiiiiii,
  /** @export */ invoke_vi,
  /** @export */ invoke_vidd,
  /** @export */ invoke_vidii,
  /** @export */ invoke_vii,
  /** @export */ invoke_viid,
  /** @export */ invoke_viidiiii,
  /** @export */ invoke_viif,
  /** @export */ invoke_viii,
  /** @export */ invoke_viiif,
  /** @export */ invoke_viiii,
  /** @export */ invoke_viiiii,
  /** @export */ invoke_viiiiii,
  /** @export */ invoke_viiiiiii,
  /** @export */ invoke_viiiiiiii,
  /** @export */ invoke_viiiiiiiii,
  /** @export */ invoke_viiiiiiiiii,
  /** @export */ invoke_viiiijii,
  /** @export */ invoke_viij,
  /** @export */ invoke_viiji,
  /** @export */ invoke_viijii,
  /** @export */ invoke_viijiii,
  /** @export */ invoke_viijiiii,
  /** @export */ invoke_viijj,
  /** @export */ invoke_vij,
  /** @export */ invoke_viji,
  /** @export */ invoke_vijii,
  /** @export */ invoke_vijiii,
  /** @export */ invoke_vijj,
  /** @export */ invoke_vj,
  /** @export */ invoke_vjiii,
  /** @export */ jsHaveAsyncify,
  /** @export */ jsHaveJspi,
  /** @export */ llvm_eh_typeid_for: _llvm_eh_typeid_for,
  /** @export */ proc_exit: _proc_exit,
  /** @export */ qt_asyncify_resume_js
};

var wasmExports = createWasm();

var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors", 0);

var _main = Module["_main"] = createExportWrapper("__main_argc_argv", 2);

var _fflush = createExportWrapper("fflush", 1);

var _free = createExportWrapper("free", 1);

var _malloc = createExportWrapper("malloc", 1);

var _strerror = createExportWrapper("strerror", 1);

var ___getTypeName = createExportWrapper("__getTypeName", 1);

var _emscripten_builtin_memalign = createExportWrapper("emscripten_builtin_memalign", 2);

var _setThrew = createExportWrapper("setThrew", 2);

var __emscripten_tempret_set = createExportWrapper("_emscripten_tempret_set", 1);

var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();

var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();

var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();

var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();

var __emscripten_stack_restore = a0 => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);

var __emscripten_stack_alloc = a0 => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);

var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();

var ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount", 1);

var ___cxa_increment_exception_refcount = createExportWrapper("__cxa_increment_exception_refcount", 1);

var ___cxa_can_catch = createExportWrapper("__cxa_can_catch", 3);

var ___cxa_get_exception_ptr = createExportWrapper("__cxa_get_exception_ptr", 1);

function invoke_vii(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viji(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index, a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiij(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiij(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_jiiji(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_ji(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_jij(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iij(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viij(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_viijii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jj(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_vjiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_vijii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iijiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vij(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiji(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iid(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vidii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_dii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiijii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vdiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viidiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiji(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ij(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iijii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_iji(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iijji(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijj(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijj(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vj(index, a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vidd(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viif(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fi(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viid(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}

// Argument name here must shadow the `wasmExports` global so
// that it is recognised by metadce and minify-import-export-names
// passes.
function applySignatureConversions(wasmExports) {
  // First, make a copy of the incoming exports object
  wasmExports = Object.assign({}, wasmExports);
  var makeWrapper_pp = f => a0 => f(a0) >>> 0;
  var makeWrapper_p_ = f => a0 => f(a0) >>> 0;
  var makeWrapper_ppp = f => (a0, a1) => f(a0, a1) >>> 0;
  var makeWrapper_p = f => () => f() >>> 0;
  wasmExports["malloc"] = makeWrapper_pp(wasmExports["malloc"]);
  wasmExports["strerror"] = makeWrapper_p_(wasmExports["strerror"]);
  wasmExports["__getTypeName"] = makeWrapper_pp(wasmExports["__getTypeName"]);
  wasmExports["emscripten_builtin_memalign"] = makeWrapper_ppp(wasmExports["emscripten_builtin_memalign"]);
  wasmExports["emscripten_stack_get_base"] = makeWrapper_p(wasmExports["emscripten_stack_get_base"]);
  wasmExports["emscripten_stack_get_end"] = makeWrapper_p(wasmExports["emscripten_stack_get_end"]);
  wasmExports["_emscripten_stack_alloc"] = makeWrapper_pp(wasmExports["_emscripten_stack_alloc"]);
  wasmExports["emscripten_stack_get_current"] = makeWrapper_p(wasmExports["emscripten_stack_get_current"]);
  wasmExports["__cxa_get_exception_ptr"] = makeWrapper_pp(wasmExports["__cxa_get_exception_ptr"]);
  return wasmExports;
}

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===
Module["callMain"] = callMain;

Module["UTF16ToString"] = UTF16ToString;

Module["stringToUTF16"] = stringToUTF16;

Module["JSEvents"] = JSEvents;

Module["specialHTMLTargets"] = specialHTMLTargets;

Module["FS"] = FS;

var missingLibrarySymbols = [ "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "convertI32PairToI53Checked", "getTempRet0", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "readEmAsmArgs", "listenOnce", "autoResumeAudioContext", "runtimeKeepalivePush", "runtimeKeepalivePop", "asmjsMangle", "HandleAllocator", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "intArrayToString", "AsciiToString", "writeArrayToMemory", "registerKeyEventCallback", "registerMouseEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "convertPCtoSourceLocation", "checkWasiClock", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "createDyncallWrapper", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "registerPostMainLoop", "registerPreMainLoop", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "Browser_asyncPrepareDataCounter", "arraySum", "addDays", "getSocketFromFD", "getSocketAddress", "FS_unlink", "FS_mkdirTree", "writeGLArray", "registerWebGlEventCallback", "runAndAbortIfError", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory", "setErrNo", "demangle", "stackTrace", "getFunctionArgsName", "createJsInvokerSignature", "registerInheritedInstance", "unregisterInheritedInstance", "getInheritedInstanceCount", "getLiveInheritedInstances", "enumReadValueFromPointer", "setDelayFunction", "validateThis", "fetchDeleteCachedData", "fetchLoadCachedData", "fetchCacheData", "fetchXHR" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "addRunDependency", "removeRunDependency", "out", "err", "abort", "wasmMemory", "wasmExports", "writeStackCookie", "checkStackCookie", "writeI53ToI64", "readI53FromI64", "readI53FromU64", "convertI32PairToI53", "convertU32PairToI53", "INT53_MAX", "INT53_MIN", "bigintToI53Checked", "stackSave", "stackRestore", "stackAlloc", "setTempRet0", "ptrToString", "zeroMemory", "exitJS", "getHeapMax", "growMemory", "ENV", "ERRNO_CODES", "strError", "DNS", "Protocols", "Sockets", "initRandomFill", "randomFill", "timers", "warnOnce", "emscriptenLog", "readEmAsmArgsArray", "jstoi_q", "jstoi_s", "getExecutableName", "getDynCaller", "dynCall", "handleException", "keepRuntimeAlive", "callUserCallback", "maybeExit", "asyncLoad", "alignMemory", "mmapAlloc", "wasmTable", "noExitRuntime", "freeTableIndexes", "functionsInTableMap", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "intArrayFromString", "stringToAscii", "UTF16Decoder", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "stringToNewUTF8", "stringToUTF8OnStack", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerWheelEventCallback", "registerUiEventCallback", "currentFullscreenStrategy", "restoreOldWindowedStyle", "jsStackTrace", "getCallstack", "UNWIND_CACHE", "ExitStatus", "getEnvStrings", "doReadv", "doWritev", "safeSetTimeout", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "findMatchingCatch", "Browser", "safeRequestAnimationFrame", "getPreloadedImageData__data", "wget", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "isLeapYear", "ydayFromDate", "SYSCALLS", "preloadPlugins", "FS_createPreloadedFile", "FS_modeStringToFlags", "FS_getMode", "FS_stdin_getChar_buffer", "FS_stdin_getChar", "FS_createPath", "FS_createDevice", "FS_readFile", "FS_createDataFile", "FS_createLazyFile", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "_setNetworkCallback", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "heapObjectForWebGLType", "toTypedArrayIndex", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "webgl_enable_EXT_polygon_offset_clamp", "webgl_enable_EXT_clip_control", "webgl_enable_WEBGL_polygon_mode", "GL", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "emscriptenWebGLGetIndexed", "webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance", "webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance", "allocateUTF8", "allocateUTF8OnStack", "print", "printErr", "InternalError", "BindingError", "throwInternalError", "throwBindingError", "registeredTypes", "awaitingDependencies", "typeDependencies", "tupleRegistrations", "structRegistrations", "sharedRegisterType", "whenDependentTypesAreResolved", "embind_charCodes", "embind_init_charCodes", "readLatin1String", "getTypeName", "getFunctionName", "heap32VectorToArray", "requireRegisteredType", "usesDestructorStack", "checkArgCount", "getRequiredArgCount", "createJsInvoker", "UnboundTypeError", "PureVirtualError", "GenericWireTypeSize", "EmValType", "EmValOptionalType", "throwUnboundTypeError", "ensureOverloadTable", "exposePublicSymbol", "replacePublicSymbol", "extendError", "createNamedFunction", "embindRepr", "registeredInstances", "getBasestPointer", "getInheritedInstance", "registeredPointers", "registerType", "integerReadValueFromPointer", "floatReadValueFromPointer", "readPointer", "runDestructors", "newFunc", "craftInvokerFunction", "embind__requireFunction", "genericPointerToWireType", "constNoSmartPtrRawPointerToWireType", "nonConstNoSmartPtrRawPointerToWireType", "init_RegisteredPointer", "RegisteredPointer", "RegisteredPointer_fromWireType", "runDestructor", "releaseClassHandle", "finalizationRegistry", "detachFinalizer_deps", "detachFinalizer", "attachFinalizer", "makeClassHandle", "init_ClassHandle", "ClassHandle", "throwInstanceAlreadyDeleted", "deletionQueue", "flushPendingDeletes", "delayFunction", "RegisteredClass", "shallowCopyInternalPointer", "downcastPointer", "upcastPointer", "char_0", "char_9", "makeLegalFunctionName", "emval_freelist", "emval_handles", "emval_symbols", "init_emval", "count_emval_handles", "getStringOrSymbol", "Emval", "emval_get_global", "emval_returnValue", "emval_lookupTypes", "emval_methodCallers", "emval_addMethodCaller", "reflectConstruct", "Fetch" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

var calledRun;

var calledPrerun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller;
};

// try this again later, after new deps are fulfilled
function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(calledPrerun, "cannot call main without calling preRun first");
  var entryFunction = _main;
  args.unshift(thisProgram);
  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach(arg => {
    HEAPU32[((argv_ptr) >>> 2) >>> 0] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr) >>> 2) >>> 0] = 0;
  try {
    var ret = entryFunction(argc, argv);
    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {
  if (runDependencies > 0) {
    return;
  }
  stackCheckInit();
  if (!calledPrerun) {
    calledPrerun = 1;
    preRun();
    // a preRun added a dependency, run will be called later
    if (runDependencies > 0) {
      return;
    }
  }
  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = 1;
    Module["calledRun"] = 1;
    if (ABORT) return;
    initRuntime();
    preMain();
    readyPromiseResolve(Module);
    Module["onRuntimeInitialized"]?.();
    if (shouldRunNow) callMain(args);
    postRun();
  }
  if (Module["setStatus"]) {
    Module["setStatus"]("Running...");
    setTimeout(() => {
      setTimeout(() => Module["setStatus"](""), 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = x => {
    has = true;
  };
  try {
    // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    [ "stdout", "stderr" ].forEach(name => {
      var info = FS.analyzePath("/dev/" + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch (e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
  }
}

if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

run();

// end include: postamble.js
// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.
moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
      }
    });
  }
}


  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = calculator_entry;
else if (typeof define === 'function' && define['amd'])
  define([], () => calculator_entry);
