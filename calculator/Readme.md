# Qt Calculator (WebAssembly)

A modular Qt-based calculator application written in C++ and built with CMake. This project supports deployment to the web using **Qt for WebAssembly (WASM)**.

## 🚀 Features

- Multiple calculator modes:
  - RPM calculation
  - Velocity calculation
  - Distance calculation
  - PID control
- Clean modular design (each function in its own class/UI)
- Built with modern **C++17** and **Qt Widgets**
- Runs on the web via WebAssembly

---
The application currently includes modules for:

  * RPM Calculation: Convert linear and angular velocities to individual wheel RPMs for a differential drive robot.

 *  Velocity Calculation: Determine actual robot velocity and individual wheel velocities from wheel RPMs.

 *  Distance Calculation: Calculate distance traveled based on encoder counts, CPR (Counts Per Revolution), and wheel radius.

  * PID Tuning: Calculate PID (Proportional-Integral-Derivative) gains (Kp, Ki, Kd) using the Ziegler-Nichols method (based on Ultimate Gain (Ku) and Ultimate Period (Tu)).*
## 📁 Project Structure

    calculator/

    ├── CMakeLists.txt
    ├── main.cpp
    ├── mainwindow/
    │   ├── mainwindow.h
    │   ├── mainwindow.cpp
    │   └── mainwindow.ui
    ├── rpm/
    │   ├── rpm.h
    │   ├── rpm.cpp
    │   └── rpm.ui
    ├── velocity/
    │   ├── velocity.h
    │   ├── velocity.cpp
    │   └── velocity.ui
    ├── distance/
    │   ├── distance.h
    │   ├── distance.cpp
    │   └── distance.ui
    ├── pid/
    │   ├── pid.h
    │   ├── pid.cpp
    │   └── pid.ui
    ├── variable/
    │   └── variable.h
    ├── resources/
    │   └── images.qrc



---

## 🛠️ Build Instructions (WebAssembly)

### ✅ Requirements

- [CMake ≥ 3.16](https://cmake.org/download/)
- Qt 6.x with WebAssembly support
- Emscripten SDK (latest)

### 1. Install Emscripten

```bash
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```
### 2. Install Qt for WebAssembly
    Download Qt for WebAssembly via Qt Online Installer or using qtchooser.
```bash
    qt-unified-linux-x64-online.run
```
> Select Qt 6.x > WebAssembly during installation

### 3. Set Up CMake Build
```bash
mkdir build-wasm && cd build-wasm
emcmake cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_PREFIX_PATH=/path/to/Qt6/wasm_64/lib/cmake
```
```bash
cmake --build .
cmake -DCMAKE_TOOLCHAIN_FILE=/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/cmake/Qt6/qt.toolchain.cmake ..
```
//use to this project for build cmake

### 4. Run in a Local Server
```bash
emrun --no_browser --port 8080 .
```
> Then open http://localhost:8080/calculator.html





