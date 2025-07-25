#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
class rpm;
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void rpm_clicked();

    void velocity_clicked();

    void distance_clicked();

    void pid_clicked();

private:
    Ui::MainWindow *ui;
     QDialog *rpm;
     QDialog *velocity;
     QDialog *distance;
     QDialog *pid;
};
#endif // MAINWINDOW_H
