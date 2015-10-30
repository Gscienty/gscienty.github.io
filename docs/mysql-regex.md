Mysql Regex 正则表达式
=======================

[reginit.c](https://github.com/mysql/mysql-server/blob/5.7/regex/reginit.c "reginit.c") 用于正则表达式初始化

```
void my_regex_init(const CHARSET_INFO* cs, my_regex_stack_check_t func);
```  
用于初始化  
这个函数里，将初始化``my_regex_enough_mem_in_stack``函数，用于检测正则表达式栈是否已满，
并通过for循环初始化编码字符进行分类存入相应的类型集合``cclasses``中。

```
void my_regex_end()
```  
用于销毁  
包括销毁编码字符分类集合cclasses以及设置``my_regex_enough_mem_in_stack``函数指针为空。

[regcomp.c](https://github.com/mysql/mysql-server/blob/5.7/regex/regcomp.c "regcomp.c") 用于将正则表达式的模式串转化为匹配指令

```
int my_regcomp(my_regex_t* preg, const char* pattern, int cflags, const CHARSET_INFO* charset);
```  
用于“编译”模式串
“编译”成功后返回0 否则返回相应错误代码。  
在函数体内，构造相应的模型：解析模型和re_guts（程序里不告诉我，原文注释是“none of your business :-)” ）并应用这两个模型。  
流水线如下：分类字符类别->压缩->findmust(感觉是找最长子序列)

[regerror.c](https://github.com/mysql/mysql-server/blob/5.7/regex/regerror.c "regerror.c") 用于转义为可读的错误信息

[regfree.c](https://github.com/mysql/mysql-server/blob/5.7/regex/regfree.c "regfree.c") 用于销毁正则匹配器

[regexec.c](https://github.com/mysql/mysql-server/blob/5.7/regex/regexec.c "regexec.c") 用于执行正则匹配

``int my_regexec(const my_regex_t* preg, const char* str, size_t nmatch, my_regmatch_t pmatch[], int eflags)``  
用于执行匹配，如果匹配成功则返回成功
