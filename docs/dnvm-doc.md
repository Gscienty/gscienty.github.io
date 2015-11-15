#.NET Version Manager#

.NET 版本管理器，用于方便的更新、使用、配置.NET运行时，等等的一个很好用的工具（命令行集和）。

这里简单mark一下使用方法  
ps：刚刚遇到一个坑，因为是用户态进行安装  
安装方法：terminal下``curl -sSL https://https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh``  每次重开terminal都要source ~/.dnx/dnvm/dnvm.sh一下。大神不要吐槽。

使用方法如是： ``dnvm <command> [options]``  

+``dnvm upgrade [-f|-force] [-u|-unstable] [-g|-global] [-y]  
默认安装最新的DNX。添加DNX到当前命令行所在位置  
-f|-force 强行执行安装。如果DNX已经存在，则将覆盖当前DNX版本。  
-u|-unstable 安装不稳定的DNX（应该是Beta版本吧）  
-g|-global 安装最新的DNX在全局配置中（默认路径为：/usr/local/lib/dnx)  
-y 设置全部确认（避免了各种"点下一步"的步骤）


