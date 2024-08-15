#!/bin/bash

# 无限循环，直到命令成功执行
while true; do
  echo "尝试启动Expo开发服务器..."
  npx expo start --tunnel

  # 检查上一个命令的退出状态码
  if [ $? -eq 0 ]; then
    echo "Expo开发服务器启动成功！"
    break # 成功退出循环
  else
    echo "启动失败，将在1秒后重试..."
    sleep 1 # 等待5秒后重试
  fi
done
