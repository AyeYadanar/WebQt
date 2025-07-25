#ifndef RPM_H
#define RPM_H

#include <QDialog>
class QMainWindow;

namespace Ui {
class Rpm;
}

class Rpm : public QDialog
{
    Q_OBJECT

public:
    explicit Rpm(QMainWindow *mainWin , QWidget *parent = nullptr);
    ~Rpm();

private slots:
    void on_home_clicked();

    void on_calculator_clicked();

private:
    Ui::Rpm *ui;
      QMainWindow *mainWindow;
};

#endif // RPM_H
