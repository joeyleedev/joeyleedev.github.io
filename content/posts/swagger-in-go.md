---
title: How to Use Swagger in Go
date: 2024-09-10
desc: 学习在 Go 项目中使用 Swagger
---

# 认识Swagger

## 1. Swagger的由来

Swagger 是由 Reverb Technologies 于 2010 年创建的一个开源项目，旨在简化 RESTful API 的设计、构建、文档编写和使用。其主要目标是通过提供一种标准化的方式来描述 API，使开发者能够更轻松地生成、描述、调用和可视化 Web 服务。 

2015 年，Swagger 项目被 SmartBear Software 收购，并在 2016 年将其规范捐赠给 OpenAPI Initiative，成为 OpenAPI 规范。

> 规范是一种与语言无关的格式，用于描述RESTful Web服务，应用程序可以解释生成的文件，这样才能生成代码、生成文档并根据其描述的服务创建模拟应用。

## 2. 什么是RESTful API

RESTful API 是基于 REST（Representational State Transfer）架构风格的应用程序编程接口。REST 是一种用于构建网络应用程序的架构风格，通常用于 Web 服务。RESTful API 遵循以下几个关键原则：

1. **资源（Resources）**: 在 REST 中，所有内容都被视为资源。每个资源都由一个唯一的 URI（Uniform Resource Identifier）标识。例如，`/todos` 可能代表一个待办事项列表。

2. **HTTP 动词（HTTP Verbs）**: RESTful API 使用标准的 HTTP 动词来执行操作：
   - `GET`：检索资源
   - `POST`：创建资源
   - `PUT`：更新资源
   - `DELETE`：删除资源

3. **无状态（Stateless）**: 每个请求从客户端到服务器必须包含所有必要的信息，服务器不会存储客户端的状态。每个请求都是独立的。

4. **统一接口（Uniform Interface）**: RESTful API 设计应遵循统一的接口约束，这样可以简化和解耦架构，使每个部分独立演化。

5. **表示（Representations）**: 资源可以有多种表示形式，例如 JSON、XML、HTML 等。客户端可以请求特定的表示形式。

6. **客户端-服务器（Client-Server）**: 客户端和服务器之间的通信是通过请求和响应进行的，客户端负责用户界面和用户状态，服务器负责数据存储和业务逻辑。

7. **可缓存（Cacheable）**: 服务器响应应明确标记是否可以缓存，以提高性能。

## 3. 什么是Swagger

Swagger 是一个用于设计、构建、记录和使用 RESTful Web 服务的开源工具集。主要组件包括：

1. [`Swagger`](https://editor.swagger.io/) ：一个基于浏览器的编辑器，可以让你编写OpenAPI（之前称为Swagger）规范。它提供了实时预览功能，可以立即看到API文档的样子。
2. **Swagger UI**：一个将OpenAPI规范文档渲染为交互式API文档的工具。用户可以查看所有API端点、模型，甚至可以直接在浏览器中发送API请求。
3. **Swagger Codegen**：可以根据OpenAPI规范自动生成服务器存根、客户端库以及API文档的代码的工具。支持多种编程语言和框架。
4. **Swagger Inspector**（和SwaggerHub）：用于测试和自动生成OpenAPI文档的在线工具。(类似于postman)

## 4. 什么是OpenAPI

OpenAPI（原名Swagger）是一个用于描述RESTful APIs的标准语言。它被设计为既易于人类阅读和理解，也易于计算机解析和生成代码，从而支持API的整个生命周期：设计、开发、测试、部署和使用。

### 4. 1 OpenAPI的主要特点

- **机器可读但对人类友好**：OpenAPI规范是基于 `JSON` 或 `YAML` 编写的，这使得它既可以被机器解析，也便于人类阅读和编写。
- **语言无关性**：OpenAPI是与语言无关的，你可以用任何语言实现服务端和客户端。
- **自动化支持**：通过OpenAPI规范，可以自动生成API的文档、客户端库和服务器端桩代码。这减少了重复工作，提高了开发效率。

### 4.2 OpenAPI文档

- OpenAPI文档是一个描述API的文档，包含了API的所有定义，如路径、操作、参数、响应等。

  ```cpp
  openapi: 3.0.0
  info:
    title: Sample API
    description: Optional multiline or single-line description in [CommonMark](<http://commonmark.org/help/>) or HTML.
    version: 0.1.9
  servers:
    - url: <http://api.example.com/v1>
      description: Optional server description, e.g. Main (production) server
    - url: <http://staging-api.example.com>
      description: Optional server description, e.g. Internal staging server for testing
  paths:
    /users:
      get:
        summary: Returns a list of users.
        description: Optional extended description in CommonMark or HTML.
        responses:
          '200':    # status code
            description: A JSON array of user names
            content:
              application/json:
                schema: 
                  type: array
                  items: 
                    type: string
  ```

  - [`swagger basic structure`](https://swagger.io/docs/specification/basic-structure/)

### 4.3 使用OpenAPI的好处

- **标准化API设计**：OpenAPI提供了一种标准化的方法来描述RESTful APIs，有助于保持API设计的一致性。
- **促进API的可发现性和可用性**：通过自动生成的文档，用户可以更容易地发现和理解API，从而提高API的可用性。

## 5. 在Go项目中自动生成swagger文档

通过代码中的注释自动生成文档，相比于手动编写Swagger文档，主要优势在于能够确保文档与代码的同步更新，显著减少重复工作和维护成本，同时提高了文档的一致性和开发效率，还支持生成交互式文档，增强了API的测试性和可用性。

### 5.1 在Gin中使用Swaggo生成openAPI文档

1. **安装Swaggo**: 首先，需要安装Swag CLI和gin-swagger库。

   ```cpp
   go install github.com/swaggo/swag/cmd/swag@latest
   go get -u github.com/swaggo/gin-swagger
   go get -u github.com/swaggo/files
   ```

2. **生成Swagger文档注释**: 在你的Gin项目中，为入口文件、API的路由处理函数、结构体等添加Swaggo注释。这些注释将用于生成Swagger文档。

   1. 入口文件

      ```go
      // @title			Todo Backend API
      // @description	This is a sample server for a todo backend.
      // @version		1.0
      // @host			localhost:8080
      // @BasePath		/
      func main() {}
      ```

   2. API路由处理函数

      ```go
      // GetAllTodos godoc
      // @Summary Get all todos
      // @Description get list of all todos
      // @Tags todos
      // @Accept  json
      // @Produce  json
      // @Success 200 {array} Todo
      // @Router /todos [get]
      func GetAllTodos(c *gin.Context) {
          // 函数实现...
      }
      ```

   3. 结构体

      ```go
      // Todo represents a todo item
      // @Description A single todo item
      // @Name Todo
      type Todo struct {
          ID          uint   `json:"id" example:"1" format:"int64"` // Todo的ID
          Title       string `json:"title" example:"Buy milk"`      // Todo的标题
          Description string `json:"description" example:"Remember to buy milk from the grocery store"` // Todo的描述
          Completed   bool   `json:"completed" example:"false"`     // 是否完成
      }
      ```

3. **初始化Swagger文档**: 在`项目根目录`下，运行Swag CLI命令来生成Swagger文档。这将读取你的注释并生成一个`docs`目录，其中包含Swagger的JSON和YAML文件。

   ```powershell
   // main.go 在根目录下
   swag init
   // main.go 不在根目录下 (例如在cmd/app下)
   swag init -g cmd/app/main.go
   ```

4. **集成Swagger到Gin路由**: 在你的Gin应用中，使用`gin-swagger`和`swaggerFiles`包来为Swagger UI提供路由。这通常在`main.go`或路由初始化文件中完成。

   ```go
   import (
       "github.com/gin-gonic/gin"
       ginSwagger "github.com/swaggo/gin-swagger"
       swaggerFiles "github.com/swaggo/files"
   )
   
   func main() {
       r := gin.Default()
   
       // Swagger路由
       r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
   
       // 其他路由...
   
       r.Run() // 默认在localhost:8080上运行
   }
   ```

5. **运行你的Gin应用**: 启动你的Gin应用。现在，你可以通过访问`http://localhost:8080/swagger/index.html`来查看和测试你的API文档了。

6. **更新文档**: 在未来，每当你更新了API的注释后，需要重新运行`swag init`来更新Swagger文档。

### 5.2 注释语法

具体语法参考[官方文档](https://github.com/swaggo/swag/blob/master/README_zh-CN.md)

以下是一些 Swaggo 常用的注释语法示例，用于定义 API 的基本信息、路由、参数、响应等。

- 在 `main.go` 或任何 Go 文件的包声明下方，使用以下注释定义 API 的基本信息：

  ```go
  // @title Swagger Example API
  // @description This is a sample server Petstore server.
  // @version 1.0
  // @host localhost:8080
  // @BasePath /api/v1
  ```

- 在具体的 handler 函数之前，使用注释定义路由和操作：

  ```go
  // @Summary Add a new pet to the store
  // @Description add by json pet
  // @Tags pets
  // @Accept  json
  // @Produce  json
  // @Param   pet  body  Pet  true  "Add Pet"
  // @Success 200  {object}  Pet
  // @Failure 400  {string}  string  "invalid input, object invalid"
  // @Router /pets [post]
  ```

- 在 API 操作注释中，使用 `@Param` 定义参数：

  ```go
  // @Param pet body Pet true "Add Pet"
  ```

  - `pet` 是参数名。
  - `body` 是参数位置（可以是 `body`, `query`, `path`, `header`, `formData`）。
  - `Pet` 是参数类型（可以是基本类型或预先定义的结构体）。
  - `true` 表示参数是否必须。
  - `"Add Pet"` 是参数的描述。

- 使用 `@Success` 和 `@Failure` 定义成功和失败的响应：

  ```go
  // @Success 200 {object} Pet
  // @Failure 400 {string} string "invalid input, object invalid"
  ```

  - `200` 和 `400` 是 HTTP 状态码。
  - `{object}` 和 `{string}` 指定返回类型。
  - `Pet` 和 `string` 分别是返回的具体类型。
  - `"invalid input, object invalid"` 是返回的描述。

- 如果 API 需要认证，可以使用 `@Security` 注释：

  ```go
  // @Security ApiKeyAuth
  ```

### 5.3 swaggo引入外部依赖

如果在项目中使用了外部包或模块，那么在生成swagger文档时，需考虑处理外部依赖。

- 使用`--parseDependency`标志解析外部依赖
- 使用`--parseInternal`引入内部包
- 使用`--parseDepth`调整解析深度

```go
swag init --parseDependency --parseInternal --parseDepth 1
```

**注意**

- 使用`-parseDependency`和`-parseInternal`可能会使文档生成过程变慢，因为Swaggo需要解析更多的文件。
- 在一些情况下，过度解析依赖可能会导致不必要的信息被包含在Swagger文档中。因此，建议仅在需要时使用这些标志。

### 5.4 swaggo格式化

swaggo 提供了 swag fmt 工具，可以针对Swag的注释自动格式化，就像`go fmt`，让注释看起来更统一。

```go
swag fmt
```

## 6. Swagger的问题和替代方案

问题点：

- 代码侵入性强，需要写很多注释，一定程度上降低了代码可读性
- 文档的展示依赖于项目的启动，不便于前端单独进行调试
- 无法返回具体的object example

替代品：

- apiFox（接口管理、开发、测试全流程集成工具）

