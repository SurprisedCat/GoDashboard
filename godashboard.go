package main
import "./linuxdashboard"
func main() {

	//路由部分
	router := linuxdashboard.RouterRegister()

	//静态资源
	router.Static("/static", "./linuxdashboard/godashboard")

	//运行的端口
	router.Run(":7676")

}
