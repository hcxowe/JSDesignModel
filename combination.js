/* 组合模式 */

/* 扫描文件夹 */

// Floder
var Folder = function(name) {
    this.name = name
    this.parent = null
    this.files = []
}

Folder.prototype.add = function(file) {
    file.parent = this
    this.files.push(file)
}

Folder.prototype.remove = function() {
    if (!this.parent) {
        return
    }

    for (var files = this.parent.files, l = files.length -1; l >= 0; l--) {
        var file = files[l]
        if (file === this) {
            files.splice(i, 1)
        }
    }
}

Folder.prototype.scan = function() {
    console.log('扫描文件夹:' + this.name)
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i]
        file.scan()
    }
}

// File
var File = function(name) {
    this.name = name
    this.parent = null
}

File.prototype.add = function() {
    throw new Error('文件下面不能添加文件')
}

File.prototype.remove = function() {
    if (!this.parent) {
        return
    }

    for (var files = this.parent.files, l = files.length -1; l >= 0; l--) {
        var file = files[l]
        if (file === this) {
            files.splice(i, 1)
        }
    }
}

File.prototype.scan = function() {
    console.log('扫描文件:' + this.name)
}

var folder = new Folder('front')
var folder1 = new Folder('js')
var folder2 = new Folder('html')
var folder3 = new Folder('css')

var file1 = new File('html权威指南')
var file2 = new File('js权威指南')
var file3 = new File('css权威指南')

folder1.add(file2)
folder2.add(file1)
folder3.add(file3)

folder.add(folder1)
folder.add(folder2)
folder.add(folder3)

folder.scan()