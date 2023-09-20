# React DockerFile v1.0.1
FROM node:18 AS builder
# 컨테이너 내부 작업 경로 설정
WORKDIR /usr/src/app
# 컨테이너 내부로 package.json 파일을 복사
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install --force
# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . /usr/src/app
# npm build
RUN npm run build

# nginx DockerFile
FROM nginx:latest
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
