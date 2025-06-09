---
title: 如何编写易于测试的代码
date: 2025-05-10
desc: 深入探讨如何通过依赖注入、面向接口编程和单一职责原则来编写易于测试的Go代码，包含实际案例和重构技巧。
---

# 如何编写易于测试的代码

## 引言

在之前的分享中，我们已经学习了如何使用 `testing` 和 `testify` 进行单元测试，但是在实际的开发中，由于依赖复杂、难以隔离、Mock困难等问题，往往使得编写单元测试很难进行下去。因此，如何写出易于测试的代码是一个值得深思的问题。

## 难以测试的业务逻辑

假设我们有一个函数，用于处理用户注册的逻辑，包括以下步骤：

1. 验证用户输入。
2. 检查用户名是否已存在（查询数据库）。
3. 给密码进行哈希处理。
4. 将用户信息保存到数据库。
5. 发送欢迎邮件。

```go
package logic

// User 用户结构体
type User struct {
    ID       int    `json:"id"`
    Email    string `json:"email"`
    Password string `json:"password"`
    Name     string `json:"name"`
}

func RegisterUser(user User) error {
	// Check if the user already exists
	existingUser, err := repo.GetUserByEmail(user.Email)
	if err != nil {
		return err
	}
	if existingUser != nil {
		return fmt.Errorf("user with email %s already exists", user.Email)
	}

	// Hash the password
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword

	// Save the user to the database
	err = repo.SaveUser(user)
	if err != nil {
		return err
	}

	// Send a welcome email
	err = emailsender.SendWelcomeEmail(user.Email)
	if err != nil {
		return err
	}

	return nil
}

func hashPassword(pwd string) (string, error) {
    // 使用 bcrypt 进行密码哈希
    bytes, err := bcrypt.GenerateFromPassword([]byte(pwd), 14)
    return string(bytes), err
}
```

上面这段代码逻辑看起来还是比较清晰的，先去数据库查询用户是否存在，若不存在就加密密码保存用户到数据库，然后发送欢迎邮件。

### 测试困难演示

但是当我们想给这个业务逻辑进行单元测试的时候，就会发现很难进行下去。

```go
func TestRegisterUser(t *testing.T) {
    // ❌ 问题1：需要真实的数据库连接
    // repo 是包级变量，测试时会连接真实数据库
    
    // ❌ 问题2：无法控制外部依赖的行为
    // 无法模拟 "用户已存在" 的场景
    
    // ❌ 问题3：测试会发送真实邮件
    // emailsender.SendWelcomeEmail 会调用真实的邮件服务
    
    // ❌ 问题4：测试之间相互影响
    // 每次测试都会在数据库中创建真实用户
}
```

主要问题如下：

1. **违反单一职责原则（SRP）：** 这个函数的主要功能是注册用户，其中包括检查用户是否存在、密码哈希处理、保存用户到数据库和发送欢迎邮件。看起来每个步骤都分开处理了，但可能存在职责过多的问题。根据单一职责原则（SRP），一个函数应该只有一个引起变化的原因。这里 `RegisterUser` 函数处理了用户验证、密码处理、数据存储和邮件发送，这明显承担了多个职责。
2. **依赖耦合：** 函数中直接使用了 `repo` 和 `emailsender` 这样的包级别的依赖，这会导致代码耦合度高，难以进行单元测试。比如，`repo.GetUserByEmail` 和 `emailsender.SendWelcomeEmail` 直接调用了外部依赖，如果在测试中需要模拟这些操作，就会很困难，因为它们没有被注入进来。

## 编写易于测试的代码

在上面的代码中，虽然我们已经使用了分层结构，例如将数据库操作放在了repo层中，但由于是直接进行函数调用，本质上与写在一个函数中没有实际区别，单元测试的时候会直接调用依赖的函数。那么如何对上面这个函数进行改进，使得其易于测试呢？

### 面向接口编程

我们可以遵循依赖倒置原则（DIP），高层业务逻辑（注册用户）不直接依赖低层具体实现（具体数据库包、邮件包），而是依赖其抽象，也就是接口。

```go
// 用户仓储接口（职责：数据持久化）
type UserRepository interface {
    GetByEmail(email string) (*User, error)
    Save(user User) error
}

// 密码哈希接口（职责：安全处理）
type PasswordHasher interface {
    Hash(password string) (string, error)
}

// 邮件通知接口（职责：发送通知）
type EmailNotifier interface {
    SendWelcomeEmail(email string) error
}
```

通过这种方式，在进行单元测试的时候，可以mock对象来代替真实对象，从而屏蔽掉数据库、网络等外部依赖，专注于测试核心逻辑。对于简单接口可直接手动实现mock对象，对于大项目中的复杂接口可选择`mockgen` 自动生成mock对象。

### 依赖注入

在创建好接口和实现之后，我们可以采用依赖注入的方式在函数中使用接口类型。在Go中最常见的注入方式是通过构造函数（如NewXXX()）。在进行单元测试时只需要手动注入不同的实现，就可以较为方便的进行单元测试而无需依赖外部资源。

```go
type UserService struct {
    repo      UserRepository
    hasher    PasswordHasher
    notifier  EmailNotifier
}

func NewUserService(
    repo UserRepository,
    hasher PasswordHasher,
    notifier EmailNotifier,
) *UserService {
    return &UserService{repo, hasher, notifier}
}

func (s *UserService) RegisterUser(user User) error {
    // 1. 检查用户是否存在（委托给 UserRepository）
    existing, err := s.repo.GetByEmail(user.Email)
    if err != nil {
        return fmt.Errorf("failed to check user existence: %w", err)
    }
    if existing != nil {
        return errors.New("user already exists")
    }

    // 2. 哈希密码（委托给 PasswordHasher）
    hashed, err := s.hasher.Hash(user.Password)
    if err != nil {
        return fmt.Errorf("failed to hash password: %w", err)
    }
    user.Password = hashed

    // 3. 保存用户（委托给 UserRepository）
    if err := s.repo.Save(user); err != nil {
        return fmt.Errorf("failed to save user: %w", err)
    }

    // 4. 发送邮件（委托给 EmailNotifier）
    if err := s.notifier.SendWelcomeEmail(user.Email); err != nil {
        log.Printf("failed to send email: %v", err)
    }

    return nil
}
```

### 单一职责原则

我们现在将原始函数修改为对接口的调用，其实就是通过接口和依赖注入，将不同维度的职责分配到独立的模块中，确保每个模块仅因 **单一原因** 被修改。

| 模块             | 职责                       | 变化原因示例                     |
| :--------------- | :------------------------- | :------------------------------- |
| `UserRepository` | 数据存取                   | 数据库从 MySQL 切换为 PostgreSQL |
| `PasswordHasher` | 密码安全处理               | 哈希算法从 bcrypt 改为 Argon2    |
| `EmailNotifier`  | 通知用户                   | 邮件服务从 SMTP 改为 AWS SES     |
| `UserService`    | 协调流程（不实现具体逻辑） | 注册流程顺序调整                 |

通俗点来说，我们可以将上述代码看作是餐厅后厨的职责分工：

- **原始代码**：像一个全能厨师，独自完成 **切菜、炒菜、摆盘、洗碗**。
  - 问题：如果切菜方式需要改进，整个厨师的工作流程都要调整。
- **职责拆分后的代码**：像专业分工的厨房：
  - **切菜工**：只负责切菜（类似 `PasswordHasher`）。
  - **炒菜师傅**：只负责炒菜（类似 `UserRepository`）。
  - **服务员**：只负责上菜（类似 `EmailNotifier`）。
  - **主厨**：协调流程，不亲自切菜炒菜（类似 `UserService`）。

## 对重构后的代码进行单元测试

### Mock 对象实现

首先，我们需要为每个接口创建 Mock 实现：

```go
// Mock 实现
type MockUserRepository struct {
    mock.Mock
}

func (m *MockUserRepository) GetByEmail(email string) (*User, error) {
    args := m.Called(email)
    return args.Get(0).(*User), args.Error(1)
}

func (m *MockUserRepository) Save(user User) error {
    args := m.Called(user)
    return args.Error(0)
}

type MockPasswordHasher struct {
    mock.Mock
}

func (m *MockPasswordHasher) Hash(password string) (string, error) {
    args := m.Called(password)
    return args.String(0), args.Error(1)
}

type MockEmailNotifier struct {
    mock.Mock
}

func (m *MockEmailNotifier) SendWelcomeEmail(email string) error {
    args := m.Called(email)
    return args.Error(0)
}
```

### 测试用例

```go
// ✅ 测试用例1：用户注册成功
func TestRegisterUser_Success(t *testing.T) {
    // 初始化 Mock
    mockRepo := new(MockUserRepository)
    mockHasher := new(MockPasswordHasher)
    mockNotifier := new(MockEmailNotifier)

    // 设置 Mock 行为
    mockRepo.On("GetByEmail", "test@example.com").Return((*User)(nil), nil)
    mockHasher.On("Hash", "123456").Return("hashed_password", nil)
    mockRepo.On("Save", mock.MatchedBy(func(user User) bool {
        return user.Email == "test@example.com" && user.Password == "hashed_password"
    })).Return(nil)
    mockNotifier.On("SendWelcomeEmail", "test@example.com").Return(nil)

    // 创建服务实例
    userService := NewUserService(mockRepo, mockHasher, mockNotifier)

    // 调用被测方法
    err := userService.RegisterUser(User{
        Email:    "test@example.com",
        Password: "123456",
    })

    // 断言结果
    assert.NoError(t, err)
    mockRepo.AssertExpectations(t)
    mockHasher.AssertExpectations(t)
    mockNotifier.AssertExpectations(t)
}

// ✅ 测试用例2：用户已存在
func TestRegisterUser_UserExists(t *testing.T) {
    mockRepo := new(MockUserRepository)
    mockHasher := new(MockPasswordHasher)
    mockNotifier := new(MockEmailNotifier)

    // 模拟用户已存在
    existingUser := &User{Email: "test@example.com"}
    mockRepo.On("GetByEmail", "test@example.com").Return(existingUser, nil)

    userService := NewUserService(mockRepo, mockHasher, mockNotifier)

    err := userService.RegisterUser(User{
        Email:    "test@example.com",
        Password: "123456",
    })

    assert.Error(t, err)
    assert.Contains(t, err.Error(), "user already exists")
    mockRepo.AssertExpectations(t)
}

// ✅ 测试用例3：密码哈希失败
func TestRegisterUser_HashPasswordFailed(t *testing.T) {
    mockRepo := new(MockUserRepository)
    mockHasher := new(MockPasswordHasher)
    mockNotifier := new(MockEmailNotifier)

    mockRepo.On("GetByEmail", "test@example.com").Return((*User)(nil), nil)
    mockHasher.On("Hash", "123456").Return("", errors.New("hash failed"))

    userService := NewUserService(mockRepo, mockHasher, mockNotifier)

    err := userService.RegisterUser(User{
        Email:    "test@example.com",
        Password: "123456",
    })

    assert.Error(t, err)
    assert.Contains(t, err.Error(), "failed to hash password")
    mockRepo.AssertExpectations(t)
    mockHasher.AssertExpectations(t)
}
```

1. **Mock 对象定义**
   - 为每个依赖接口（`UserRepository`、`PasswordHasher`、`EmailNotifier`）创建了对应的 Mock 结构体
   - 使用 `testify/mock` 实现接口方法，通过 `Called` 方法记录调用参数
2. **测试场景覆盖**
   - **正常流程**：所有依赖都返回成功
   - **用户已存在**：仓储层返回已存在用户
   - **密码哈希失败**：哈希器返回错误
   - **保存用户失败**：仓储层保存返回错误
   - **邮件发送失败**：邮件通知器返回错误，但主流程仍然成功
3. **断言验证**
   - 使用 `assert` 验证返回错误是否符合预期
   - 通过 `AssertExpectations` 确保所有预期的 Mock 调用都被执行
4. **测试隔离性**
   每个测试用例都创建新的 Mock 实例，确保测试之间互不干扰

### 测试最佳实践

1. **测试命名规范**
   ```go
   // ✅ 好的命名：明确说明测试场景和预期结果
   func TestRegisterUser_WhenUserExists_ShouldReturnError(t *testing.T)
   func TestRegisterUser_WhenHashFails_ShouldReturnError(t *testing.T)
   
   // ❌ 不好的命名：无法快速理解测试意图
   func TestRegisterUser1(t *testing.T)
   func TestRegisterUser2(t *testing.T)
   ```

2. **Arrange-Act-Assert (AAA) 模式**
   ```go
   func TestExample(t *testing.T) {
       // Arrange: 准备测试数据和 Mock
       mockRepo := new(MockUserRepository)
       mockRepo.On("GetByEmail", "test@example.com").Return(nil, nil)
       
       // Act: 执行被测试的方法
       err := userService.RegisterUser(user)
       
       // Assert: 验证结果
       assert.NoError(t, err)
       mockRepo.AssertExpectations(t)
   }
   ```

3. **使用 Table-Driven Tests 处理多场景**
   ```go
   func TestRegisterUser_MultipleScenarios(t *testing.T) {
       tests := []struct {
           name          string
           setupMocks    func(*MockUserRepository, *MockPasswordHasher)
           user          User
           expectedError string
       }{
           {
               name: "success",
               setupMocks: func(repo *MockUserRepository, hasher *MockPasswordHasher) {
                   repo.On("GetByEmail", "test@example.com").Return((*User)(nil), nil)
                   hasher.On("Hash", "123456").Return("hashed", nil)
                   repo.On("Save", mock.Anything).Return(nil)
               },
               user: User{Email: "test@example.com", Password: "123456"},
               expectedError: "",
           },
           // 更多测试案例...
       }
       
       for _, tt := range tests {
           t.Run(tt.name, func(t *testing.T) {
               // 测试逻辑
           })
       }
   }
   ```

## 总结

### 核心原则回顾

| 原则             | 作用         | 实现方式                   |
| ---------------- | ------------ | -------------------------- |
| **面向接口编程** | 解耦具体实现 | 定义接口，依赖抽象而非具体 |
| **依赖注入**     | 控制外部依赖 | 通过构造函数注入接口实现   |
| **单一职责**     | 明确模块边界 | 每个类/函数只负责一种职责  |

### 何时使用这些原则？

**✅ 推荐使用的场景：**
- 项目有明确的单元测试要求
- 团队规模较大，需要并行开发
- 项目生命周期较长，需要考虑维护性
- 业务逻辑复杂，外部依赖较多

**⚠️ 可以简化的场景：**
- 简单的脚本或工具类项目
- 原型验证阶段
- 团队对Go接口不够熟悉的初期

记住：**好的代码不仅要能工作，更要易于测试和维护**。面向接口编程、依赖注入、单一职责这三者互为支撑，有助于构建高内聚、低耦合、易拓展、好测试的代码。

## References

- [如何编写易于单元测试的代码](https://www.cnblogs.com/CareySon/p/18762884/how_to_write_testable_code)
- [如何编写可测试的代码](https://cloud.tencent.com/developer/article/2383272)
- [Golang编写易于单元测试的代码](https://blog.hackerpie.com/posts/testing/golang-write-testable-codes/)
