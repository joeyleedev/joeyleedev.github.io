---
title: Go 代码注释规范
date: 2024-10-10
desc: Go 代码注释规范
---

# Go 代码注释规范

在 Go 语言中，注释是非常重要的，因为它们可以帮助其他开发者理解你的代码。遵循注释规范有以下几个原因：

1. **提高代码可读性**：良好的注释可以帮助其他开发者快速理解代码的功能和工作方式。
2. **生成文档**：Go 语言有一个叫做 `godoc` 的工具，它可以从你的注释中自动生成文档。如果你的注释遵循规范，那么 `godoc` 生成的文档将会更加清晰和有用。
3. **代码审查**：在代码审查过程中，良好的注释可以帮助审查者理解你的代码，从而更有效地进行审查。

## 1. 包 (Packages)

在 Go 中，包注释是用来描述整个包的功能和用途的。它通常放在包声明之前，以 `//` 开头，且在注释和包声明之间不能有空行. 包注释应该以 "Package <包名>" 开头。

下面是关于 paths 包的注释：

```go
// Package path 实现了操作斜线分隔的路径的实用程序。
//
// path 只应用于由正斜线分隔的路径，例如URL中的路径。这个包
// 不处理带有驱动器字母或反斜线的Windows路径；要操作
// 操作系统路径，请使用 [path/filepath] 包。
package path
```

对于有很多文件的包，包注释应该只存在于一个源文件中，通常会放在与包同名的源文件中。

在使用 `go doc` 命令生成文档时，包注释会被用来生成包的概述部分。在上述例子中，[path/filepath] 中的中括号会创建一个文档链接.

### 1.1 使用 doc.go

在 Go 语言中，包注释通常放在名为`doc.go`的文件中，这是一种约定，但并非强制。`doc.go`文件的主要目的是包含包级别的文档，这样可以清楚地将文档与实现代码分离，使得代码更易于阅读和维护。

然而，如果一个包只包含一个文件，或者你觉得更方便，你也可以将包注释放在任何一个包文件的开头。只要这个注释出现在包声明之前，`godoc`工具就能正确地解析它。

例如，如果你有一个名为`mypackage`的包，你可以在`doc.go`文件中这样写包注释：

```go
// Package mypackage 提供了一些实用的功能。
//
// 这里可以详细描述这个包的功能和用途，包括它提供的主要API，如何使用它，
// 以及任何相关的示例代码。
package mypackage
```

对于命令，你可以在`main`包的`doc.go`文件中添加注释，描述命令的用途和用法。例如：

```go
// The mycommand program provides some useful features.
//
// Usage:
//
//     mycommand [options] arg1 arg2
//
// Options:
// -h，--help    show this help message
// -v，--version show version information
//
// More detailed information can be found at:
// https://example.com/mycommand
package main
```

## 2. 命令 (Commands)

在 Go 中，如果一个 package 是一个 command (可以作为单独的程序运行)，那么包注释就是描述这个程序的行为。

通常以该程序的名字开头，也就是这个包的名字。按照英文规则，在开头会将名字大写。比如，如果一个命令的名字叫 “gofmt”，那么这个包的注释就可以像下面这样：

```go
/*
Gofmt formats Go programs.
It uses tabs for indentation and blanks for alignment.
Alignment assumes that an editor is using a fixed-width font.

Usage:

    gofmt [flags] [path ...]

The flags are:

    -d
        Do not print reformatted sources to standard output.
        If a file's formatting is different than gofmt's，print diffs
        to standard output.

...
*/
package main
```

缩进的行被视为预格式化的文本：它们不会被重新换行，并且在 HTML 和 Markdown 演示文稿中以代码字体打印。

## 3. 类型 (Types)

`Type` 的文档注释应该解释该类型的实例代表或提供了什么。如果 API 很简单，那注释也可以很简洁。比如：

```go
package zip

// Reader 从ZIP存档中提供内容
type Reader struct {
    ...
}
```

默认情况下，程序员应该期望一个类型一次只能被单个程序安全使用。如果类型提供了更强的保证，则应该在文档注释中说明它们。例如：

```go
package regexp

// Regexp 是编译后正则表达式的表示形式。
// Regexp 对于多个例程并发使用是安全的，
// 配置方法除外，如 Longest。
type Regexp struct {
    ...
}
```

Types 还应该确保零值具有实际意义。如果不是很明显，那么就应该记录下来。比如：

```go
package bytes

// Buffer 是具有 Read 和 Write 方法的可变大小的字节缓冲区。
// Buffer 的零值是一个可以使用的空缓冲区。
type Buffer struct {
    ...
}
```

对于具有可导出字段的结构体，文档注释或字段注释应该解释每个可导出字段的含义。例如：

```go
package io

// LimitedReader 从 R 读取数据，但将返回的数据量限制为 N 字节。
// 每次对 Read 的调用都会更新 N 以反映新的剩余数量。
// 当N <= 0时，Read 返回 EOF 。
type LimitedReader struct {
    R   Reader // 底层读取器
    N   int64  // 剩余的最大字节数
}
```

```go
package comment

// Printer 用于打印文档注释。
// 结构体的字段可以在调用任何打印方法之前进行设置,
// 以自定义打印过程的细节。
type Printer struct {
    // HeadingLevel 表示 HTML 和 Markdown 标题的嵌套级别。
    // 如果 HeadingLevel 为零，则默认为级别3,
    // 意味着使用 <h3> 和 ### 。
    HeadingLevel int
    ...
}
```

## 4. 函数 (Funcs)

Go 语言的函数文档注释应该解释函数返回什么，或者对于调用以产生副作用的函数，它做了什么。可以直接在注释中引用命名的参数和结果，无需任何特殊的语法，如反引号。

```go
package strconv

// Quote 返回一个表示 s 的双引号包围的 Go 字符串字面量。
// 返回的字符串使用 Go 的转义序列 (如 \t，\n，\xFF，\u0100)
// 来表示控制字符和非打印字符。
func Quote(s string) string {
    ...
}
```

```go
package os

// Exit 接收一个整数 code 作为参数，并使当前程序以给定的状态码退出.
// 按照惯例，状态码为零表示成功，非零表示错误.
// 程序立即终止; 不会运行延迟函数.
//
// 为了可移植性，状态码应在 [0，125] 范围内.
func Exit(code int) {
    ...
}
```

对于返回 Boolean 的函数，文档注释通常使用 "报告是否" (reports whether) 来描述。比如：

```go
package strings

// HasPrefix 报告字符串 s 是否以 prefix 作为前缀。
func HasPrefix(s，prefix string) bool
```

如果一个函数需要解释多个结果，通过命名多个结果 (`n` 和 `err`)，可以使得注释更容易理解，即使在函数体中并没有使用这些名称。相反，当结果不需要在文档注释中命名时，它们通常也会在代码中被省略，就像上面的 Quote 示例一样，以避免混乱的表示。

```go
package io

// Copy 从 src 读取数据并写入到 dst，直到在 src 上达到 EOF 或发生错误.
// 它返回写入的总字节数 (n) 和在复制过程中遇到的第一个错误 (err)，如果有的话.
//
// 如果 Copy 成功，那么它将返回 err == nil，而不是 err == EOF,
// 因为 Copy 被定义为从 src 读取数据直到 EOF,
// 所以它不会将从 Read 返回的 EOF 视为需要报告的错误.
func Copy(dst Writer，src Reader) (n int64，err error) {
    ...
}
```

在 Go 语言中，对于顶级函数 (即不是任何类型的方法的函数)，默认情况下，程序员可以假设它是线程安全的，即可以从多个 goroutine 同时调用; 这个事实无需明确地在文档注释中声明。

另一方面，如前一节所述，对类型实例的任何使用，包括调用方法，通常都被假定为一次只能由一个 goroutine 进行。如果一个类型的方法是线程安全的，但这个事实没有在类型的文档注释中说明，那么应该在每个方法的注释中单独说明。例如：

```go
package sql

// Close 将连接返回到连接池。
// 在调用 Close 之后进行的所有操作都将返回 ErrConnDone 错误。
// Close 方法可以与其他操作并发调用，并且会阻塞，直到所有其他操作完成。
// 在调用 Close 之前，可能首先需要取消任何使用的上下文。
func (c *Conn) Close() error {
    ...
}
```

需要注意函数和方法的文档注释关注的是操作返回什么或做什么，详细说明调用者需要知道的内容。特殊情况对于记录尤为重要。例如：

```go
package math

// Sqrt 返回 x 的平方根。
//
// 特殊情况:
//
//  Sqrt(+Inf) = +Inf
//  Sqrt(±0) = ±0
//  Sqrt(x < 0) = NaN
//  Sqrt(NaN) = NaN
func Sqrt(x float64) float64 {
    ...
}
```

文档注释不应该解释函数的内部细节如实现算法。具体实现的算法应写在函数体里的注释中。文档注释应该专注于函数的行为，即它做什么，返回什么，以及有哪些边界条件或特殊情况。

```go
package sort

// Sort 函数将 data 排序为升序，排序的顺序由 Less 方法确定。
// Sort 函数会调用一次 data.Len 来确定 n，
// 并会调用 O(n*log(n)) 次 data.Less 和 data.Swap。
// 这个排序算法不保证稳定性。
func Sort(data Interface) {
    ...
}
```

因为文档注释没有提到具体的排序算法，所以如果在未来决定更改实现，例如使用不同的排序算法，那么不需要更改文档注释，因为它描述的是函数的行为，而不是其具体实现。

这种做法符合编程中的一个重要原则，即抽象。通过隐藏内部实现的细节，我们可以使代码的不同部分更独立，更易于理解和维护。这也使得我们可以在不影响其他代码的情况下更改或优化实现。

## 5. 常量 (Consts)

在 Go 语言中，你可以使用声明语法来分组声明，这样就可以使用一个文档注释来介绍一组相关的常量，而每个常量只需要一个简短的行尾注释。例如:

```go
package http

// 在 IANA 注册的 HTTP 状态码。
// See：https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
const (
    StatusContinue           = 100 // RFC 7231，6.2.1
    StatusSwitchingProtocols = 101 // RFC 7231，6.2.2
    StatusProcessing         = 102 // RFC 2518，10.1
    StatusEarlyHints         = 103 // RFC 8297
    StatusOK                 = 200 // RFC 7231，6.3.1
    StatusCreated            = 201 // RFC 7231，6.3.2
    // ...
)
```

对于不需要文档注释的分组可以直接使用行尾注释。比如:

```go
package unicode // import "unicode"

const (
    MaxRune         = '\U0010FFFF' // maximum valid Unicode code point.
    ReplacementChar = '\uFFFD'     // represents invalid code points.
    MaxASCII        = '\u007F'     // maximum ASCII value.
    MaxLatin1       = '\u00FF'     // maximum Latin-1 value.
)
```

另一方面，未分组的常量通常需要以完整句子开头的完整文档注释。例如:

```go
package unicode

// Version 是派生表的 Unicode 版本。
const Version = "13.0.0"
```

在 Go 语言中，类型常量通常会显示在其类型声明的旁边，因此常常会省略常量组的文档注释，而使用类型的文档注释。例如：

```go
package http

// StatusCode 是 HTTP 响应状态码。
type StatusCode int

const (
    StatusContinue           StatusCode = 100 // RFC 7231，6.2.1
    StatusSwitchingProtocols StatusCode = 101 // RFC 7231，6.2.2
    StatusProcessing         StatusCode = 102 // RFC 2518，10.1
    StatusEarlyHints         StatusCode = 103 // RFC 8297
    StatusOK                 StatusCode = 200 // RFC 7231，6.3.1
    StatusCreated            StatusCode = 201 // RFC 7231，6.3.2
    // ...
)
```

## 6. 变量 (Vars)

变量的规范与常量相同。下面是一组变量和一个变量的注释例子:

```go
package fs

// 通用文件系统错误。
// 可以使用 errors.Is 来测试文件系统返回的错误。
var (
    ErrInvalid    = errInvalid()    // "invalid argument"
    ErrPermission = errPermission() // "permission denied"
    ErrExist      = errExist()      // "file already exists"
    ErrNotExist   = errNotExist()   // "file does not exist"
    ErrClosed     = errClosed()     // "file already closed"
)
```

```go
package unicode

// Scripts 是 Unicode 脚本表的集合。
var Scripts = map[string]*RangeTable{
    "Adlam"：                 Adlam,
    "Ahom"：                  Ahom,
    "Anatolian_Hieroglyphs"： Anatolian_Hieroglyphs,
    "Arabic"：                Arabic,
    "Armenian"：              Armenian,
    ...
}
```

## 7. 语法 (Syntax)

Go 语言的文档注释使用一种简单的语法，支持段落，标题，链接，列表和预格式化的代码块。为了保持源文件中的注释轻量级和可读，Go 不支持像改变字体或使用原始 HTML 这样的复杂特性。喜欢 Markdown 的人可以将 Go 的注释语法视为 Markdown 的简化子集。标准的格式化工具`gofmt`会将文档注释重新格式化，使其使用每个特性的规范格式。

`gofmt`旨在提高可读性，并让用户控制源代码中注释的编写方式，但它会调整注释的呈现方式，以使特定注释的语义含义更清晰，这类似于在普通源代码中将`1+2 * 3`重新格式化为`1 + 2*3`。

指令注释，如`//go:generate`，不被视为文档注释的一部分，因此在渲染的文档中会被省略。`gofmt`会将指令注释移动到文档注释的末尾，前面有一个空行。例如：

```go
package regexp

// Op 是一个正则表达式操作符。
//
//go:generate stringer -type Op -trimprefix Op
type Op uint8
```

指令注释是匹配正则表达式`//(line |extern |export |[a-z0-9]+:[a-z0-9])`的行. 定义自己指令的工具应使用`//toolname:directive`的形式。

`gofmt`会删除文档注释中的前导和尾随空行。如果文档注释中的所有行都以相同的空格和制表符序列开始，`gofmt`会删除该前缀。

以下是 Go 语言文档注释的一些基本语法和示例:

1. **段落**：在文档注释中，段落由一个或多个连续的行组成，段落之间用一个空行分隔。

   ```go
   // This is the first paragraph.
   //
   // This is the second paragraph.
   ```

2. **标题**：标题（headings）是以一个井号（U+0023）开始，后面跟着一个空格和标题文本。为了被识别为标题，该行必须没有缩进，并且必须通过空行与相邻的段落文本分开。例如：

   ```go
   // # This is a heading
   //
   // This is a paragraph under the heading.
   ```

   下面是一些反例:

   ```go
   // #This is not a heading，because there is no space.
   //
   // # This is not a heading,
   // # because it is multiple lines.
   //
   // # This is not a heading,
   // because it is also multiple lines.
   //
   // The next paragraph is not a heading，because there is no additional text:
   //
   // #
   //
   // In the middle of a span of non-blank lines,
   // # this is not a heading either.
   //
   //     # This is not a heading，because it is indented.
   ```

3. **链接**：链接目标是由一组未缩进的非空行定义的，每行的形式都是`[Text]：URL`。在同一文档注释的其他文本中，`[Text]`表示使用给定文本链接到 URL。例如：

   ```go
   // Package json implements encoding and decoding of JSON as defined in
   // [RFC 7159]. The mapping between JSON and Go values is described
   // in the documentation for the Marshal and Unmarshal functions.
   //
   // For an introduction to this package，see the article
   // “[JSON and Go].”
   //
   // [RFC 7159]：https://tools.ietf.org/html/rfc7159
   // [JSON and Go]：https://golang.org/doc/articles/json_and_go.html
   package json
   ```

   在这个例子中，`[RFC 7159]`和`[JSON and Go]`是超链接，它们分别链接到`https://tools.ietf.org/html/rfc7159`和`https://golang.org/doc/articles/json_and_go.html`。

4. **文档链接**：在 Go 的文档注释中，你可以使用特殊的语法来创建文档链接（doc links）。这些链接可以引用当前包或其他包中的导出标识符。

   - `[Name1]`或`[Name1.Name2]`可以引用当前包中的导出标识符。
   - `[pkg]`、`[pkg.Name1]`或`[pkg.Name1.Name2]`可以引用其他包中的标识符。

   在下面这个例子中，`[io.EOF]`和`[ErrTooLarge]`都是文档链接，它们分别链接到`io.EOF`和`ErrTooLarge`的文档。

   ```go
   package bytes

   // ReadFrom 从 r 读取数据直到 EOF，并将其追加到缓冲区，根据需要增加缓冲区。
   // 返回值 n 是读取的字节数. 除了 [io.EOF]，在读取中遇到的任何错误也会返回。
   // 如果缓冲区变得太大，ReadFrom 会报 [ErrTooLarge] panic。
   func (b *Buffer) ReadFrom(r io.Reader) (n int64，err error) {
       // ...
   }
   ```

   注意，文档链接必须被标点符号、空格、制表符或行的开始或结束所包围，以避免与映射、泛型和数组类型等语法结构发生冲突。例如，文本`map[ast.Expr]TypeAndValue`中并不包含文档链接。

5. **列表**：列表是由带有前导符号（如`-`，`*`，`1.`，`1)`）的行组成的。开头需有制表符或空格,否则不生效。

   ```go
   // Features:
   //   - Feature 1
   //   - Feature 2
   //   - Feature 3

   // Steps:
   //  1. Step 1
   //  2. Step 2
   //  3. Step 3
   ```

   列表项只包含段落，不包含代码块或嵌套列表。这避免了任何空间计数的麻烦，以及关于在不一致缩进中制表符计算多少空格的问题。

   `gofmt`会对列表进行重格式化。

   - 无序列表使用 `-` 作为标志符，在 `-` 前有两个空格的缩进。
   - 有序列表使用 `1.`的格式作为标志符，在数字前有一个空格的缩进。

   `gofmt`会保留列表与前一段落的一个空行 (如果有) 并且会在列表与后一个段落中间插入一个空行来分隔开。

6. **预格式化的代码块**：预格式化 (preformatted) 的代码块是由带有前导制表符 (tab) 的行组成的。

   ```go
   package sort

   // Search 使用二分查找...
   //
   // 举个例子，下面程序猜测你的数字
   //
   //  func GuessingGame() {
   //      var s string
   //      fmt.Printf("Pick an integer from 0 to 100.\n")
   //      answer := sort.Search(100，func(i int) bool {
   //          fmt.Printf("Is your number <= %d? "，i)
   //          fmt.Scanf("%s"，&s)
   //          return s != "" && s[0] == 'y'
   //      })
   //      fmt.Printf("Your number is %d.\n"，answer)
   //  }
   func Search(n int，f func(int) bool) int {
       ...
   }
   ```

   `gofmt`会在每个代码块的前后插入空白行，将代码块与周围的段落区分开。

## 8. 常见错误和陷阱

错误一：列表或代码块没有缩进

```go
package http

// cancelTimerBody is an io.ReadCloser that wraps rc with two features:
// 1) On Read error or close，the stop func is called.
// 2) On Read failure，if reqDidTimeout is true，the error is wrapped and
//    marked as net.Error that hit its timeout.
type cancelTimerBody struct {
    ...
}
```

```go
package smtp

// localhostCert is a PEM-encoded TLS cert generated from src/crypto/tls:
//
// go run generate_cert.go --rsa-bits 1024 --host 127.0.0.1,::1,example.com \
//     --ca --start-date "Jan 1 00:00:00 1970" --duration=1000000h
var localhostCert = []byte(`...`)
```

错误二：为了美观在换行后对齐文本而添加缩进 (后面紧跟代码时)

```go
// TODO Revisit this design. It may make sense to walk those nodes
//      only once.

// According to the document:
// "The alignment factor (in bytes) that is used to align the raw data of sections in
//  the image file. The value should be a power of 2 between 512 and 64 K，inclusive."
```

错误三：没有为列表或代码块的换行内容提供缩进 (后面紧跟代码时)

```go
// Uses of this error model include:
//
//   - Partial errors. If a service needs to return partial errors to the
// client,
//     it may embed the `Status` in the normal response to indicate the
// partial
//     errors.
//
//   - Workflow errors. A typical workflow has multiple steps. Each step
// may
//     have a `Status` message for error reporting.
```

## References

1. [Go Doc Comments - The Go Programming Language](https://go.dev/doc/comment)
2. [Go 语言编码规范指导 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/63250689)
