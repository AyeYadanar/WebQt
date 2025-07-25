#include "distance.h"
#include "ui_distance.h"
#include "mainwindow.h"
#include "variable.h"
Distance::Distance(QMainWindow *mainWin , QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::Distance)
    , mainWindow(mainWin)
{
    ui->setupUi(this);
    connect(ui->home, &QPushButton::clicked, this, &Distance::on_home_clicked);
    ui->label_4->setText("Encoder Count");
    ui->label_5->setText("CPR");
    ui->label_6->setText("Wheel Radius");
    ui->label_7->setText("Wheel Distance");
    ui->label_9->setText("Distance");
    ui->label->setText("Encoder Count To Distance");
}

Distance::~Distance()
{
    delete ui;
}

void Distance::on_home_clicked()
{
    mainWindow->show();
    this->close();
}


void Distance::on_calculator_clicked()
{
    double Encodercount = ui->lineEdit_3->text().toDouble();
    double cpr = ui->lineEdit_4->text().toDouble();
    double r = ui->lineEdit_5->text().toDouble();

    double circumference = 2* pi * r ;
    double distance = ( Encodercount / cpr) * circumference ;

    ui->lineEdit_6->setText(QString::number(distance));

}

