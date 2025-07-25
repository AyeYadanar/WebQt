#ifndef DISTANCE_H
#define DISTANCE_H

#include <QDialog>
class QMainWindow;

namespace Ui {
class Distance;
}

class Distance : public QDialog
{
    Q_OBJECT

public:
    explicit Distance(QMainWindow *mainWin , QWidget *parent = nullptr);
    ~Distance();

private slots:
    void on_home_clicked();

    void on_calculator_clicked();

private:
    Ui::Distance *ui;
     QMainWindow *mainWindow;
};

#endif // DISTANCE_H
