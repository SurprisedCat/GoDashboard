# GoDashboard

A Dasoboard for nearly all the linux distributions. This work is inspired by linux dash.  

## Features

* A web-based dashboard for any Linux System
* Written by Golang, with multiple charts for CPU utilization, tasks, Memory usage and net statistics.
* Using Ajax to update data and modular design. Each graph can be used independently.
* Simple web UI with low complexity
* Easy to be inserted into other systems.

## Prerequisites

    Gin framework (go get -u github.com/gin-gonic/gin)

## Installation

### Step 1: Download GoDashboard

Clone the git repo

```sh
git clone https://github.com/SurprisedCat/GoDashboard.git
```

Or download it **[here](https://github.com/SurprisedCat/GoDashboard.git)**.


### Step 2 Start the application

With Golang:

```go
go run godashboard.go
```

Without Golang:

```sh
cd Your-GoDashboard-Dir && ./godashboard
```

### Step 3 Visit Web UI

```sh
http://your-ip:7676/
```

## Project Structure

├── godashboard  
├── godashboard.go  
├── LICENSE  
├── linuxdashboard  
│   ├── godashboard  
│   │   ├── css  
│   │   │   ├── bootstrap.css  
│   │   │   ├── fonts.css  
│   │   │   └── style.css  
│   │   ├── images  
│   │   │   └── logo.png  
│   │   ├── index.html  
│   │   └── js  
│   │       ├── bootstrap.js  
│   │       ├── echarts.min.js  
│   │       ├── gosimple.js  
│   │       └── jquery.min.js  
│   └── linuxdata.go  
└── README.md  

### godashboard.go

The main function of GoDashboard. Start to Listen at port 7676.

### linuxdata.go

System executive functions for raw data of performance.

### godashboard diretory

The web files.

#### gosimple.js

The charts are presented in this file.

## Tested Linux distributions

* Opensuse
* alpine
* CentOS
* Debian / Ubuntu / Raspbian
* Arch
* Fedora
* Mageia
* Busybox
* AmazonLinux

## Important

GoDashBoard **does not provide any security or authentication functions**.

## Supported By

* Gin framework
* Echarts
* Bootstrap
* Linux Mint 16+
* JQuery
