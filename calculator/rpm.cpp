#include "rpm.h"
#include "ui_rpm.h"
#include "mainwindow.h"
#include <QMessageBox>
#include "variable.h"


Rpm::Rpm(QMainWindow *mainWin,QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::Rpm)
    , mainWindow(mainWin)
{
    ui->setupUi(this);
     connect(ui->home, &QPushButton::clicked, this, &Rpm::on_home_clicked);
    ui->label->setText("Linear velocity(m/s)");
    ui->label_2->setText("Angular velocity(rad/s)");
    ui->label_3->setText("Wheel radius(m)");
    ui->label_4->setText("Wheel separation(m)");
    ui->label_6->setText("RPM left");
    ui->label_7->setText("RPM right");
    ui->label_5->setText("Yours Robot RPM");
    ui->label_8->setText("Velocity to RPM");
}

Rpm::~Rpm()
{
    delete ui;
}

void Rpm::on_home_clicked()
{
    mainWindow->show();
    this->close();
}


void Rpm::on_calculator_clicked()
{
    bool ok1, ok2, ok3, ok4;
    double v = ui->lineEdit->text().toDouble(&ok1);
    double w = ui->lineEdit_2->text().toDouble(&ok2);
    double r = ui->lineEdit_3->text().toDouble(&ok3);
    double L = ui->lineEdit_4->text().toDouble(&ok4);

    if (!(ok1 && ok2 && ok3 && ok4)) {
        QMessageBox::warning(this, "Input Error", "Please enter valid numbers.");
        return;
    }

    double rpm_left = ((2*v - w*L) / (2*r)) *rad_to_rpm;
    double rpm_right = ((2*v + w*L) / (2*r)) *rad_to_rpm;

    ui->lineEdit_5->setText(QString::number(rpm_left));
    ui->lineEdit_6->setText(QString::number(rpm_right));
}

