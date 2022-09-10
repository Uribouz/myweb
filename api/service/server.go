package main

import (
	"net/http"

	// _ "github.com/go-sql-driver/mysql"

	"github.com/labstack/echo"

	"github.com/labstack/echo/middleware"
)

type Todo struct {
	ID        string `json:"id"`
	TITLE     string `json:"title"`
	COMPLETED bool   `json:"completed"`
	SELECTED  bool   `json:"selected"`
}

// Step-5. [Backend - GO] Create GO API Server & Connect MariaDB (connect DB,config CORS,API Endpoint)

func main() {
	var todos []Todo
	// db, err := sql.Open("mysql", "yourusername:yourpassword@/testing")
	// if err != nil {
	// 	fmt.Println(err)
	// 	panic(err.Error())
	// }
	// defer db.Close()
	// fmt.Println("OK Connect DB")

	// results, err := db.Query("SELECT * FROM todos")

	// if err != nil {
	// 	fmt.Println(err)
	// 	panic(err.Error())
	// }

	// for results.Next() {
	// 	var todo Todo

	// 	err = results.Scan(&todo.ID, &todo.TITLE, &todo.COMPLETED, &todo.SELECTED)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		panic(err.Error())
	// 	}

	// 	todos = append(todos, todo)

	// }

	//Mock
	todos = []Todo{
		{"1", "Wakeup", true, false},
		{"2", "Workout", false, true},
		{"3", "Chores", false, false},
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	e.GET("/", func(c echo.Context) error {
		u := todos
		return c.JSON(http.StatusOK, u)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
