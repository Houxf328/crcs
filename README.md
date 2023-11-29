# 快速创建react模版

## 安装命令 npm install -g crcs

## 创建指令 
### crcs add 您想要创建的文件名 -d（可选，可指定创建文件的目录路径，不加默认将文件创建到src/papes目录下）
### 例如：crcs add UserList -d src/pages/components


### crcs addP 您想要创建的文件名 （此指令默认将文件添加在src/pages目录下，不可指定添加的文件目录位置）
### 例如：crcs addP Demo

## 输入创建指令后会在终端提示您创建的react模版文件所使用的语法（class｜hooks），您可以根据自己常用的喜好去创建，
## 同时也会询问你是否需要添加样式文件，目前支持less，sass，也可以选择不创建样式文件

## 后续考虑是否加入redux，services等文件，看具体需要，也可以考虑将vue模版的创建也兼容进来，使用过程中遇到各种问题
## 都可以向我反馈，或者有别的想法的等等，欢迎大家找我一起探讨，谢谢