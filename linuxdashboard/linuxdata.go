package linuxdashboard

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

//RouterRegister Register router information
func RouterRegister() *gin.Engine {
	fmt.Println("Linux Dashboard")
	router := gin.Default()

	router.LoadHTMLFiles("linuxdashboard/godashboard/index.html")

	router.GET("/", IndexAPI)
	router.GET("/proc/stat", ProcStat)
	router.GET("/proc/loadavg", ProcLoadavg)
	router.GET("/proc/meminfo", ProcMeminfo)
	router.GET("/proc/tcp", ProcTCP)
	router.GET("/proc/udp", ProcUDP)
	router.GET("/proc/netdev", ProcNetDev)

	return router
}

//IndexAPI 显示主界面
func IndexAPI(c *gin.Context) {

	c.HTML(http.StatusOK, "index.html", gin.H{})
}

/*
* Data are encoded into json format
 */

//ProcStat data of cpu utilization
func ProcStat(c *gin.Context) {
	res := CmdExec("cat /proc/stat | head -n 1 | awk '{$1=\"\";print}'")
	resArray := strings.Split(res[0], " ")
	var cpu []int64
	var totalcpu, idlecpu int64
	for _, v := range resArray {
		temp, err := strconv.ParseInt(v, 10, 64)
		if err == nil {
			cpu = append(cpu, temp)
			totalcpu = totalcpu + temp
		}
	}
	idlecpu = cpu[3]
	c.JSON(http.StatusOK, gin.H{
		"totalcpu": totalcpu,
		"idlecpu":  idlecpu,
	})
}

//ProcLoadavg data of task load and running process
func ProcLoadavg(c *gin.Context) {
	res := CmdExec("cat /proc/loadavg")
	resArray := strings.Split(res[0], " ")
	load5, _ := strconv.ParseFloat(resArray[0], 32)
	load10, _ := strconv.ParseFloat(resArray[1], 32)
	load15, _ := strconv.ParseFloat(resArray[2], 32)
	runningString := strings.Split(resArray[3], "/")
	runningprocess, _ := strconv.Atoi(runningString[0])
	c.JSON(http.StatusOK, gin.H{
		"load5":          load5,
		"load10":         load10,
		"load15":         load15,
		"runningprocess": runningprocess,
	})
}

//ProcMeminfo data of memory usage
func ProcMeminfo(c *gin.Context) {
	res := CmdExec("cat /proc/meminfo | head -n 2| awk '{print $2}'")
	totalMem, _ := strconv.Atoi(res[0])
	freeMem, _ := strconv.Atoi(res[1])
	usedMem := totalMem - freeMem
	c.JSON(http.StatusOK, gin.H{
		"totalMem": totalMem,
		"usedMem":  usedMem,
	})
}

//ProcTCP data of tcp connections (v4/v6)
func ProcTCP(c *gin.Context) {
	res := CmdExec("cat /proc/net/tcp | wc -l")
	tcpV4Links, _ := strconv.Atoi(res[0])
	res = CmdExec("cat /proc/net/tcp6 | wc -l")
	tcpV6Links, _ := strconv.Atoi(res[0])
	c.JSON(http.StatusOK, gin.H{
		"tcpV4Links": tcpV4Links - 2,
		"tcpV6Links": tcpV6Links - 2,
	})
}

//ProcUDP data of udp connections (v4/v6)
func ProcUDP(c *gin.Context) {
	res := CmdExec("cat /proc/net/udp | wc -l")
	udpV4Links, _ := strconv.Atoi(res[0])
	res = CmdExec("cat /proc/net/udp6 | wc -l")
	udpV6Links, _ := strconv.Atoi(res[0])
	c.JSON(http.StatusOK, gin.H{
		"udpV4Links": udpV4Links - 2,
		"udpV6Links": udpV6Links - 2,
	})
}

//ProcNetDev data of transmited and received bytes from each NIC
func ProcNetDev(c *gin.Context) {
	res := CmdExec("cat /proc/net/dev | sed '1,2d' | grep -v lo | awk '{ print $1,$2,$10 }'")
	var resSlice = make(map[string][2]int64)
	var temp = [2]int64{0, 0}
	var tempName string
	for _, v := range res {
		component := strings.Split(v, " ")
		if component[1] != "0" && component[2] != "0" {
			tempName = strings.Replace(component[0], ":", "", -1)
			fmt.Println(tempName)
			temp[0], _ = strconv.ParseInt(component[1], 10, 64)
			temp[1], _ = strconv.ParseInt(component[2], 10, 64)
			resSlice[tempName] = temp
		}
	}
	c.JSON(http.StatusOK, resSlice)
}

//CmdExec Execute the command using "sh -c"
func CmdExec(usercommand string) []string {
	cmd := exec.Command("sh", "-c", usercommand)
	out, err := cmd.Output()
	if err != nil {
		log.Fatalf("cmd.Run() failed with %s\n", err)
	}
	//using "\n" will append an empty line to the end of the resArray
	resArray := strings.Split(string(out), "\n")
	//delete the last and empty element
	resArray = resArray[:len(resArray)-1]
	return resArray
}
