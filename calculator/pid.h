#ifndef PID_H
#define PID_H

#include <QDialog>
class QMainWindow;

namespace Ui {
class Pid;
}

class Pid : public QDialog
{
    Q_OBJECT

public:
    explicit Pid(QMainWindow *mainWin , QWidget *parent = nullptr);
    ~Pid();

private slots:
    void on_home_clicked();

    void on_calculator_clicked();

private:
    Ui::Pid *ui;
    QMainWindow *mainWindow;
};

#endif // PID_H
