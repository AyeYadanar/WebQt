#ifndef VELOCITY_H
#define VELOCITY_H

#include <QDialog>
class QMainWindow;

namespace Ui {
class Velocity;
}

class Velocity : public QDialog
{
    Q_OBJECT

public:
    explicit Velocity(QMainWindow *mainWin , QWidget *parent = nullptr);
    ~Velocity();

private slots:
    void on_home_clicked();

    void on_calculator_clicked();

private:
    Ui::Velocity *ui;
    QMainWindow *mainWindow;
};

#endif // VELOCITY_H
