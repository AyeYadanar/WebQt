#include "mainwindow.h"
#include "./ui_mainwindow.h"
#include "rpm.h"
#include "velocity.h"
#include "distance.h"
#include "pid.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->label->setText("ROM ROBOTICS");
    ui->label_2->setText("ROBOTICS CALCULATOR");
    //ui->label->setStyleSheet("QLabel{color:white;}");
    ui->rpm->setStyleSheet("QPushButton{background-color: grey; color: black;}"
                                  "QPushButton:hover {"
                                  "  background-color: green;"
                                  "}");
    ui->velocity->setStyleSheet("QPushButton {"
                                    "  background-color: grey;"
                                    "  color: black;"
                                    "}"
                                    "QPushButton:hover {"
                                    "  background-color: purple;"
                                    "}");
    ui->distance->setStyleSheet("QPushButton {"
                                    "  background-color: grey;"
                                    "  color: black;"
                                    "}"
                                    "QPushButton:hover {"
                                    "  background-color: blue;"
                                    "}");
    ui->pid->setStyleSheet("QPushButton {"
                                    "  background-color: grey;"
                                    "  color: black;"
                                    "}"
                                    "QPushButton:hover {"
                                    "  background-color: red;"
                                    "}");
    connect(ui->rpm, &QPushButton::clicked, this, &MainWindow::rpm_clicked);
    connect(ui->velocity, &QPushButton::clicked, this, &MainWindow::velocity_clicked);
    connect(ui->distance, &QPushButton::clicked, this, &MainWindow::distance_clicked);
    connect(ui->pid, &QPushButton::clicked, this, &MainWindow::pid_clicked);

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::rpm_clicked()
{
    this->hide();
    rpm =new Rpm(this);
    rpm->show();
}


void MainWindow::velocity_clicked()
{
    this->hide();
    velocity=new Velocity(this);
    velocity->show();
}


void MainWindow::distance_clicked()
{

    this->hide();
    distance=new Distance(this);
    distance->show();
}


void MainWindow::pid_clicked()
{
    this->hide();
    pid=new Pid(this);
    pid->show();
}

