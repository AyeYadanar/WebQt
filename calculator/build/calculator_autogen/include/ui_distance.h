/********************************************************************************
** Form generated from reading UI file 'distance.ui'
**
** Created by: Qt User Interface Compiler version 6.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_DISTANCE_H
#define UI_DISTANCE_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QDialog>
#include <QtWidgets/QFrame>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>

QT_BEGIN_NAMESPACE

class Ui_Distance
{
public:
    QVBoxLayout *verticalLayout_5;
    QVBoxLayout *verticalLayout_2;
    QFrame *frame;
    QVBoxLayout *verticalLayout_3;
    QLabel *label;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_4;
    QSpacerItem *horizontalSpacer_4;
    QLineEdit *lineEdit_3;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_5;
    QSpacerItem *horizontalSpacer_5;
    QLineEdit *lineEdit_4;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_6;
    QSpacerItem *horizontalSpacer_6;
    QLineEdit *lineEdit_5;
    QFrame *frame_2;
    QVBoxLayout *verticalLayout_4;
    QLabel *label_9;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_7;
    QSpacerItem *horizontalSpacer_7;
    QLineEdit *lineEdit_6;
    QHBoxLayout *horizontalLayout;
    QSpacerItem *horizontalSpacer;
    QPushButton *home;
    QSpacerItem *horizontalSpacer_3;
    QPushButton *calculator;
    QSpacerItem *horizontalSpacer_2;

    void setupUi(QDialog *Distance)
    {
        if (Distance->objectName().isEmpty())
            Distance->setObjectName("Distance");
        Distance->resize(400, 314);
        verticalLayout_5 = new QVBoxLayout(Distance);
        verticalLayout_5->setObjectName("verticalLayout_5");
        verticalLayout_2 = new QVBoxLayout();
        verticalLayout_2->setObjectName("verticalLayout_2");
        verticalLayout_2->setContentsMargins(-1, 0, -1, 50);
        frame = new QFrame(Distance);
        frame->setObjectName("frame");
        frame->setFrameShape(QFrame::Shape::StyledPanel);
        frame->setFrameShadow(QFrame::Shadow::Raised);
        verticalLayout_3 = new QVBoxLayout(frame);
        verticalLayout_3->setObjectName("verticalLayout_3");
        label = new QLabel(frame);
        label->setObjectName("label");

        verticalLayout_3->addWidget(label, 0, Qt::AlignmentFlag::AlignHCenter);


        verticalLayout_2->addWidget(frame);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName("horizontalLayout_5");
        label_4 = new QLabel(Distance);
        label_4->setObjectName("label_4");

        horizontalLayout_5->addWidget(label_4);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout_5->addItem(horizontalSpacer_4);

        lineEdit_3 = new QLineEdit(Distance);
        lineEdit_3->setObjectName("lineEdit_3");

        horizontalLayout_5->addWidget(lineEdit_3);


        verticalLayout_2->addLayout(horizontalLayout_5);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setObjectName("horizontalLayout_6");
        label_5 = new QLabel(Distance);
        label_5->setObjectName("label_5");

        horizontalLayout_6->addWidget(label_5);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout_6->addItem(horizontalSpacer_5);

        lineEdit_4 = new QLineEdit(Distance);
        lineEdit_4->setObjectName("lineEdit_4");
        QSizePolicy sizePolicy(QSizePolicy::Policy::Minimum, QSizePolicy::Policy::Fixed);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(lineEdit_4->sizePolicy().hasHeightForWidth());
        lineEdit_4->setSizePolicy(sizePolicy);

        horizontalLayout_6->addWidget(lineEdit_4);


        verticalLayout_2->addLayout(horizontalLayout_6);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName("horizontalLayout_7");
        label_6 = new QLabel(Distance);
        label_6->setObjectName("label_6");

        horizontalLayout_7->addWidget(label_6);

        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_6);

        lineEdit_5 = new QLineEdit(Distance);
        lineEdit_5->setObjectName("lineEdit_5");

        horizontalLayout_7->addWidget(lineEdit_5);


        verticalLayout_2->addLayout(horizontalLayout_7);

        frame_2 = new QFrame(Distance);
        frame_2->setObjectName("frame_2");
        frame_2->setFrameShape(QFrame::Shape::StyledPanel);
        frame_2->setFrameShadow(QFrame::Shadow::Raised);
        verticalLayout_4 = new QVBoxLayout(frame_2);
        verticalLayout_4->setObjectName("verticalLayout_4");
        label_9 = new QLabel(frame_2);
        label_9->setObjectName("label_9");

        verticalLayout_4->addWidget(label_9, 0, Qt::AlignmentFlag::AlignHCenter);


        verticalLayout_2->addWidget(frame_2);

        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setObjectName("horizontalLayout_8");
        label_7 = new QLabel(Distance);
        label_7->setObjectName("label_7");

        horizontalLayout_8->addWidget(label_7);

        horizontalSpacer_7 = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout_8->addItem(horizontalSpacer_7);

        lineEdit_6 = new QLineEdit(Distance);
        lineEdit_6->setObjectName("lineEdit_6");

        horizontalLayout_8->addWidget(lineEdit_6);


        verticalLayout_2->addLayout(horizontalLayout_8);


        verticalLayout_5->addLayout(verticalLayout_2);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName("horizontalLayout");
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout->addItem(horizontalSpacer);

        home = new QPushButton(Distance);
        home->setObjectName("home");

        horizontalLayout->addWidget(home);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout->addItem(horizontalSpacer_3);

        calculator = new QPushButton(Distance);
        calculator->setObjectName("calculator");

        horizontalLayout->addWidget(calculator);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Policy::Expanding, QSizePolicy::Policy::Minimum);

        horizontalLayout->addItem(horizontalSpacer_2);


        verticalLayout_5->addLayout(horizontalLayout);


        retranslateUi(Distance);

        QMetaObject::connectSlotsByName(Distance);
    } // setupUi

    void retranslateUi(QDialog *Distance)
    {
        Distance->setWindowTitle(QCoreApplication::translate("Distance", "Dialog", nullptr));
        label->setText(QCoreApplication::translate("Distance", "TextLabel", nullptr));
        label_4->setText(QCoreApplication::translate("Distance", "TextLabel", nullptr));
        label_5->setText(QCoreApplication::translate("Distance", "TextLabel", nullptr));
        label_6->setText(QCoreApplication::translate("Distance", "TextLabel", nullptr));
        label_9->setText(QCoreApplication::translate("Distance", "TextLabel", nullptr));
        label_7->setText(QCoreApplication::translate("Distance", "TextLabel", nullptr));
        home->setText(QCoreApplication::translate("Distance", "Home", nullptr));
        calculator->setText(QCoreApplication::translate("Distance", "Calculator", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Distance: public Ui_Distance {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_DISTANCE_H
