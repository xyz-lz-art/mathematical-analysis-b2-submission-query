# 数学分析(B2)提交情况查询

这是一个可部署到 GitHub Pages 的纯静态网页。同学输入学号后，只能看到 15 次作业和 2 次小测是否提交，不显示具体等级或分数。

## 本地查看

直接打开 `index.html` 即可查看。如果浏览器限制本地脚本，也可以在本文件夹运行任意静态服务器，例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## GitHub Pages 部署

1. 在 GitHub 新建一个仓库，例如 `b2-submission-query`。
2. 将本文件夹中的全部文件上传到仓库根目录。
3. 打开仓库 `Settings` -> `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`，保存。

部署完成后，访问地址通常是：

```text
https://你的GitHub用户名.github.io/b2-submission-query/
```

## 更新数据

如果 Excel 数据之后有变化，需要重新生成 `data/submissions.js`，并重新上传到 GitHub。
