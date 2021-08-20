pipeline {
    agent any
    environment{
        DOCKERHUB_CREDENTIALS= credentials('kevinospina-dockerhub')
    }
    stages {
         stage('Checkout') {
            steps {
               checkout([$class: 'GitSCM', branches: [[name: '*/master']], browser: [$class: 'GithubWeb', repoUrl: 'https://github.com/KevinOspina/simple-app.git'], extensions: [], userRemoteConfigs: [[credentialsId: '5588d1ab-8ef0-45f4-961a-85d26e404591', url: 'https://github.com/KevinOspina/simple-app']]])
            }
        }
        
        stage('Build'){
            steps{
                 sh 'docker build -t kevinospina03/simple-app:latest .'
            }
        }
        
        stage('Login'){
            steps{
                
                sh 'echo $PASS | docker login -u $USER --password-stdin'
                 //sh '''
                 //    echo "${PASS} | docker login -u ${USER} --password-stdin"
                 //'''
            }
        }
        
        stage('Push'){
            steps{
                 sh 'docker push kevinospina03/simple-app:latest'
            }
        }
        
        
        stage('Deploy') {
            steps {
               
                 withCredentials([usernamePassword(credentialsId: '37267417-47b3-42ac-9844-3f307ddb9306', passwordVariable: 'password', usernameVariable: 'username')]){
                    /**
                    * Restart docker server
                    **/
                    sh '''
                        echo "${PASS} | docker login -u ${USER} --password-stdin"
                        docker stop simple-app
                        docker rm simple-app
                        docker pull kevinospina03/simple-app:latest
                        docker run -d -p 4200:4200 --name simple-app -t kevinospina03/simple-app:latest
                    '''
                }
            }
        
        }
    }
    post {
        always {
            sh 'docker logout'
        }

    }

}
