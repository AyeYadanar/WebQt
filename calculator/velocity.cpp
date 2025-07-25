#include "velocity.h"
#include "ui_velocity.h"
#include "mainwindow.h"
#include "variable.h"

Velocity::Velocity(QMainWindow *mainWin , QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::Velocity)
    , mainWindow(mainWin)
{
    ui->setupUi(this);
     connect(ui->home, &QPushButton::clicked, this, &Velocity::on_home_clicked);
    ui->label->setText("Actual RPM to  Actual Robot velocity ");
    ui->label_2->setText("RPM left");
    ui->label_3->setText("RPM Right");
    ui->label_4->setText("Wheel radius(m)");
    ui->label_5->setText("Wheel separation(m)");
    ui->label_6->setText("Actual Robot Velocity");
    ui->label_7->setText("Wheel Velocity Left(m/s)");
    ui->label_8->setText("Wheel Velocity Right(m/s)");
}

Velocity::~Velocity()
{
    delete ui;
}

void Velocity::on_home_clicked()
{
    mainWindow->show();
    this->close();
}


void Velocity::on_calculator_clicked()
{
    double rpmLeft = ui->lineEdit->text().toDouble();
    double rpmRight = ui->lineEdit_2->text().toDouble();
    double wheelRadius = ui->lineEdit_3->text().toDouble();
    double wheelSeparation = ui->lineEdit_4->text().toDouble();

    // Convert RPM to radians/sec
    double wLeft = rpmLeft * 2 * pi/ 60.0;
    double wRight = rpmRight * 2 * pi / 60.0;

    double vLeft = wLeft * wheelRadius;
    double vRight = wRight * wheelRadius;

    ui->lineEdit_5->setText(QString::number(vLeft));
    ui->lineEdit_6->setText(QString::number(vRight));
}

