# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/aye/qt/calculator

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug

# Include any dependencies generated for this target.
include CMakeFiles/calculator.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/calculator.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/calculator.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/calculator.dir/flags.make

calculator_autogen/EWIEGA46WW/qrc_images.cpp: ../../images.qrc
calculator_autogen/EWIEGA46WW/qrc_images.cpp: CMakeFiles/calculator_autogen.dir/AutoRcc_images_EWIEGA46WW_Info.json
calculator_autogen/EWIEGA46WW/qrc_images.cpp: ../../images/logo.jpg
calculator_autogen/EWIEGA46WW/qrc_images.cpp: /home/aye/Qtwebassembly/6.9.1/gcc_64/libexec/rcc
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Automatic RCC for images.qrc"
	/usr/bin/cmake -E cmake_autorcc /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles/calculator_autogen.dir/AutoRcc_images_EWIEGA46WW_Info.json Debug

CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o: calculator_autogen/mocs_compilation.cpp
CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o -MF CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o.d -o CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o -c /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/calculator_autogen/mocs_compilation.cpp

CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/calculator_autogen/mocs_compilation.cpp > CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.i

CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/calculator_autogen/mocs_compilation.cpp -o CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.s

CMakeFiles/calculator.dir/main.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/main.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/main.cpp.o: ../../main.cpp
CMakeFiles/calculator.dir/main.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/calculator.dir/main.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/main.cpp.o -MF CMakeFiles/calculator.dir/main.cpp.o.d -o CMakeFiles/calculator.dir/main.cpp.o -c /home/aye/qt/calculator/main.cpp

CMakeFiles/calculator.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/main.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/main.cpp > CMakeFiles/calculator.dir/main.cpp.i

CMakeFiles/calculator.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/main.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/main.cpp -o CMakeFiles/calculator.dir/main.cpp.s

CMakeFiles/calculator.dir/mainwindow.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/mainwindow.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/mainwindow.cpp.o: ../../mainwindow.cpp
CMakeFiles/calculator.dir/mainwindow.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object CMakeFiles/calculator.dir/mainwindow.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/mainwindow.cpp.o -MF CMakeFiles/calculator.dir/mainwindow.cpp.o.d -o CMakeFiles/calculator.dir/mainwindow.cpp.o -c /home/aye/qt/calculator/mainwindow.cpp

CMakeFiles/calculator.dir/mainwindow.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/mainwindow.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/mainwindow.cpp > CMakeFiles/calculator.dir/mainwindow.cpp.i

CMakeFiles/calculator.dir/mainwindow.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/mainwindow.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/mainwindow.cpp -o CMakeFiles/calculator.dir/mainwindow.cpp.s

CMakeFiles/calculator.dir/rpm.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/rpm.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/rpm.cpp.o: ../../rpm.cpp
CMakeFiles/calculator.dir/rpm.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object CMakeFiles/calculator.dir/rpm.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/rpm.cpp.o -MF CMakeFiles/calculator.dir/rpm.cpp.o.d -o CMakeFiles/calculator.dir/rpm.cpp.o -c /home/aye/qt/calculator/rpm.cpp

CMakeFiles/calculator.dir/rpm.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/rpm.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/rpm.cpp > CMakeFiles/calculator.dir/rpm.cpp.i

CMakeFiles/calculator.dir/rpm.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/rpm.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/rpm.cpp -o CMakeFiles/calculator.dir/rpm.cpp.s

CMakeFiles/calculator.dir/velocity.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/velocity.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/velocity.cpp.o: ../../velocity.cpp
CMakeFiles/calculator.dir/velocity.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object CMakeFiles/calculator.dir/velocity.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/velocity.cpp.o -MF CMakeFiles/calculator.dir/velocity.cpp.o.d -o CMakeFiles/calculator.dir/velocity.cpp.o -c /home/aye/qt/calculator/velocity.cpp

CMakeFiles/calculator.dir/velocity.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/velocity.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/velocity.cpp > CMakeFiles/calculator.dir/velocity.cpp.i

CMakeFiles/calculator.dir/velocity.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/velocity.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/velocity.cpp -o CMakeFiles/calculator.dir/velocity.cpp.s

CMakeFiles/calculator.dir/distance.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/distance.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/distance.cpp.o: ../../distance.cpp
CMakeFiles/calculator.dir/distance.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object CMakeFiles/calculator.dir/distance.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/distance.cpp.o -MF CMakeFiles/calculator.dir/distance.cpp.o.d -o CMakeFiles/calculator.dir/distance.cpp.o -c /home/aye/qt/calculator/distance.cpp

CMakeFiles/calculator.dir/distance.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/distance.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/distance.cpp > CMakeFiles/calculator.dir/distance.cpp.i

CMakeFiles/calculator.dir/distance.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/distance.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/distance.cpp -o CMakeFiles/calculator.dir/distance.cpp.s

CMakeFiles/calculator.dir/pid.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/pid.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/pid.cpp.o: ../../pid.cpp
CMakeFiles/calculator.dir/pid.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building CXX object CMakeFiles/calculator.dir/pid.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/pid.cpp.o -MF CMakeFiles/calculator.dir/pid.cpp.o.d -o CMakeFiles/calculator.dir/pid.cpp.o -c /home/aye/qt/calculator/pid.cpp

CMakeFiles/calculator.dir/pid.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/pid.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/pid.cpp > CMakeFiles/calculator.dir/pid.cpp.i

CMakeFiles/calculator.dir/pid.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/pid.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/pid.cpp -o CMakeFiles/calculator.dir/pid.cpp.s

CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o: CMakeFiles/calculator.dir/flags.make
CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o: CMakeFiles/calculator.dir/includes_CXX.rsp
CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o: calculator_autogen/EWIEGA46WW/qrc_images.cpp
CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o: CMakeFiles/calculator.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Building CXX object CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o -MF CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o.d -o CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o -c /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/calculator_autogen/EWIEGA46WW/qrc_images.cpp

CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.i"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/calculator_autogen/EWIEGA46WW/qrc_images.cpp > CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.i

CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.s"
	/home/aye/dev/emsdk/upstream/emscripten/em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/calculator_autogen/EWIEGA46WW/qrc_images.cpp -o CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.s

# Object files for target calculator
calculator_OBJECTS = \
"CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o" \
"CMakeFiles/calculator.dir/main.cpp.o" \
"CMakeFiles/calculator.dir/mainwindow.cpp.o" \
"CMakeFiles/calculator.dir/rpm.cpp.o" \
"CMakeFiles/calculator.dir/velocity.cpp.o" \
"CMakeFiles/calculator.dir/distance.cpp.o" \
"CMakeFiles/calculator.dir/pid.cpp.o" \
"CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o"

# External object files for target calculator
calculator_EXTERNAL_OBJECTS = \
"/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QGifPlugin_init/QGifPlugin_init.cpp.o" \
"/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QICOPlugin_init/QICOPlugin_init.cpp.o" \
"/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QJpegPlugin_init/QJpegPlugin_init.cpp.o" \
"/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/iconengines/objects-Release/QSvgIconPlugin_init/QSvgIconPlugin_init.cpp.o" \
"/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QSvgPlugin_init/QSvgPlugin_init.cpp.o" \
"/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/platforms/objects-Release/QWasmIntegrationPlugin_init/QWasmIntegrationPlugin_init.cpp.o"

calculator.js: CMakeFiles/calculator.dir/calculator_autogen/mocs_compilation.cpp.o
calculator.js: CMakeFiles/calculator.dir/main.cpp.o
calculator.js: CMakeFiles/calculator.dir/mainwindow.cpp.o
calculator.js: CMakeFiles/calculator.dir/rpm.cpp.o
calculator.js: CMakeFiles/calculator.dir/velocity.cpp.o
calculator.js: CMakeFiles/calculator.dir/distance.cpp.o
calculator.js: CMakeFiles/calculator.dir/pid.cpp.o
calculator.js: CMakeFiles/calculator.dir/calculator_autogen/EWIEGA46WW/qrc_images.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QGifPlugin_init/QGifPlugin_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QICOPlugin_init/QICOPlugin_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QJpegPlugin_init/QJpegPlugin_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/iconengines/objects-Release/QSvgIconPlugin_init/QSvgIconPlugin_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/objects-Release/QSvgPlugin_init/QSvgPlugin_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/platforms/objects-Release/QWasmIntegrationPlugin_init/QWasmIntegrationPlugin_init.cpp.o
calculator.js: CMakeFiles/calculator.dir/build.make
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/Widgets_resources_1/.qt/rcc/qrc_qstyle_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/Widgets_resources_2/.qt/rcc/qrc_qstyle1_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/Widgets_resources_3/.qt/rcc/qrc_qstyle_fusion_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/Widgets_resources_4/.qt/rcc/qrc_qmessagebox_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/QWasmIntegrationPlugin_resources_1/.qt/rcc/qrc_wasmfonts_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/QWasmIntegrationPlugin_resources_2/.qt/rcc/qrc_wasmwindow_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/Gui_resources_1/.qt/rcc/qrc_qpdf_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/objects-Release/Gui_resources_2/.qt/rcc/qrc_gui_shaders_init.cpp.o
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6Core.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6Widgets.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/libqgif.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/libqico.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/libqjpeg.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/iconengines/libqsvgicon.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/imageformats/libqsvg.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/plugins/platforms/libqwasm.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6BundledLibjpeg.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6Svg.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6OpenGL.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6Gui.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6BundledHarfbuzz.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6BundledFreetype.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6BundledLibpng.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6Core.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6BundledZLIB.a
calculator.js: /home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/libQt6BundledPcre2.a
calculator.js: CMakeFiles/calculator.dir/linklibs.rsp
calculator.js: CMakeFiles/calculator.dir/objects1.rsp
calculator.js: CMakeFiles/calculator.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Linking CXX executable calculator.js"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/calculator.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/calculator.dir/build: calculator.js
.PHONY : CMakeFiles/calculator.dir/build

CMakeFiles/calculator.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/calculator.dir/cmake_clean.cmake
.PHONY : CMakeFiles/calculator.dir/clean

CMakeFiles/calculator.dir/depend: calculator_autogen/EWIEGA46WW/qrc_images.cpp
	cd /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/aye/qt/calculator /home/aye/qt/calculator /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug /home/aye/qt/calculator/build/WebAssembly_Qt_6_9_1_single_threaded-Debug/CMakeFiles/calculator.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/calculator.dir/depend

