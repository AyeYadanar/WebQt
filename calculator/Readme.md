Robotics Calculator
This project is a Robotics Calculator application built with Qt, designed to assist robotics enthusiasts and engineers with common calculations related to robot movement and control.

Features
The application currently includes modules for:

RPM Calculation: Convert linear and angular velocities to individual wheel RPMs for a differential drive robot.

Velocity Calculation: Determine actual robot velocity and individual wheel velocities from wheel RPMs.

Distance Calculation: Calculate distance traveled based on encoder counts, CPR (Counts Per Revolution), and wheel radius.

PID Tuning: Calculate PID (Proportional-Integral-Derivative) gains (Kp, Ki, Kd) using the Ziegler-Nichols method (based on Ultimate Gain (Ku) and Ultimate Period (Tu)).

Project Structure
The project is organized into several C++ and Qt UI files:

main.cpp: The entry point of the application.

mainwindow.h, mainwindow.cpp, mainwindow.ui: Main window for navigating to different calculator modules.

rpm.h, rpm.cpp, rpm.ui: Module for RPM calculations.

velocity.h, velocity.cpp, velocity.ui: Module for velocity calculations.

distance.h, distance.cpp, distance.ui: Module for distance calculations.

pid.h, pid.cpp, pid.ui: Module for PID gain calculations.

variable.h: Contains global constants like pi and rad_to_rpm.

CMakeLists.txt: CMake build script for the project.

images.qrc: Qt Resource file (if used for images within the UI).

Building and Running
This project uses CMake and Qt. To build and run the application, you will need to have Qt (5 or 6) and CMake installed on your system.

Prerequisites
Qt (5 or 6)

CMake (version 3.16 or higher)

A C++ compiler (e.g., GCC, Clang, MSVC)

Steps
Clone the repository (if applicable) or place all files in a directory.

Create a build directory:

mkdir build
cd build

Run CMake to configure the project:

cmake ..

If you have multiple Qt versions installed, you might need to specify the Qt installation path, for example:

cmake -DCMAKE_PREFIX_PATH="/path/to/your/Qt/version" ..
cmake -DCMAKE_TOOLCHAIN_FILE=/home/aye/Qtwebassembly/6.9.1/wasm_singlethread/lib/cmake/Qt6/qt.toolchain.cmake ..

Build the project:

cmake --build .

Run the application:
The executable will be located in the build directory, typically build/calculator (on Linux/macOS) or build/Debug/calculator.exe (on Windows, depending on your build configuration).

./calculator # On Linux/macOS
# or
.\Debug\calculator.exe # On Windows
# or
emrun --no_browser --port 8080 . # on Webassembely

Usage
Upon launching the application, you will be presented with a main menu. Click on the respective buttons to navigate to the RPM, Velocity, Distance, or PID calculation modules. Each module provides input fields for the necessary parameters and a "Calculate" button to display the results. A "Home" button is available in each module to return to the main menu.

Contributing
If you'd like to contribute to this project, please feel free to fork the repository and submit pull requests.

License
(You can add your desired license information here, e.g., MIT, Apache 2.0, etc.)