import { useContext } from "react";
import { SiteContext } from "../globalcontext";

export function InfrastructurePage() {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div style={{ display: siteContext?.currentLanguage === "EN" ? 'block' : 'none' }}>
                <h2>Hosting and Deployment</h2>
                <p>At my last company I set up the Docker stack used to host our websites (utilising Nginx), as well as our internal API (in Go).</p>
                <p>At my current company I have contributed heavily to the local Docker development stack, adding the ability for the tests to run out-of-the-box without any configuration. I created multiple Docker stacks across different repositories that run our unit tests via GitHub Actions, in addition to new container definitions for AWS (again, using Nginx) on which to host our lending sites and internal dashboards.</p>
                <p>I also have personal experience creating Docker stacks for Capacitor app sites (Vue.js) with a Go backend, hosted on DigitalOcean.</p>
                <p>All the above has also made me confident with tasks such as setting up SSL certificates (Certbot etc), writing Nginx site configurations, configuring firewalls, connecting via SSH and SFTP, creating DNS records and more.</p>
                <p>In terms of hosting providers, I have exposure to Azure, AWS and DigitalOcean. I would be comfortable creating and deploying a website or API in a scalable, secure and economically sensible fashion on any of these, as well as utilising many of the extra features they offer such as bucket storage, database hosting or health checks.</p>
                <p>I have commercial experience utilising deployment tools such as GitHub Actions, TeamCity and Jenkins.</p>
                <h2>Databases</h2>
                <p>I have used PostgreSQL, Microsft SQL Server, MongoDB and MySQL in a commercial setting.</p>
                <p>I am a fan of an everything-in-a-transaction approach, but have also worked on lots of APIs in stacks where transactions aren't strongly encouraged (e.g. MongoDB). Interstingly most of the companies I have worked at have either not used transactions or have done so sparingly.</p>
                <p>When it comes to simplicity, my favourite database is MongoDB. If I had to pick something where performance was an important consideration, I'd probably opt for PostgreSQL.</p>
                <p>While not a database, I have experience using and configuring Redis.</p>
                <h2>Operating Systems</h2>
                <p>I am primarily a Windows user but I prefer Ubuntu for containerisation and hosting, so am comfortable on the command line. I also have some experience with other flavours like CentOS 7 and Manjaro.</p>
            </div>

            <div style={{ display: siteContext?.currentLanguage === "JP" ? 'block' : 'none' }}>
                <h2>ホスティングとデプロイ</h2>
                <p>私の2社目では、ウェブサイトをホストするためのDockerスタック（Nginxを利用）と、内部API（Goで構築）のセットアップを行いました。</p>
                <p>現在の会社では、ローカルのDocker開発スタックに大きく貢献し、設定なしでテストを実行できる機能を追加しました。複数のリポジトリにわたるDockerスタックを作成し、GitHub Actionsを介してユニットテストを実行するほか、AWS用の新しいコンテナ定義（Nginxを使用）を作成して、貸し出しサイトや内部ダッシュボードをホストしています。</p>
                <p>また、個人的にはGoバックエンドを持つCapacitorアプリサイト（Vue.js）用のDockerスタックを作成し、DigitalOceanにホストした経験があります。</p>
                <p>これらすべてにより、SLS証明書の設定（Certbotなど）、Nginxサイトの設定、ファイアウォールの構成、SSHおよびSFTP経由の接続、DNSレコードの作成などのタスクに自信を持っています。</p>
                <p>ホスティングプロバイダーに関しては、Azure、AWS、DigitalOceanに触れたことがあります。これらのいずれかで、スケーラブルで安全かつ経済的に合理的な方法でウェブサイトやAPIを作成およびデプロイすることに加え、バケットストレージ、データベースホスティング、ヘルスチェックなどの多くの追加機能を利用することができます。</p>
                <p>GitHub Actions、TeamCity、Jenkinsなどのデプロイメントツールを利用した商業経験もあります。</p>

                <h2>データベース</h2>
                <p>商業環境でPostgreSQL、Microsoft SQL Server、MongoDB、MySQLを使用した経験があります。</p>
                <p>私はすべてをトランザクションで処理するアプローチのファンですが、トランザクションが強く推奨されていないスタック（例：MongoDB）で多くのAPIを作成した経験もあります。興味深いことに、私が働いていたほとんどの会社ではトランザクションを使用していないか、または控えめに使用していました。</p>
                <p>シンプルさに関しては、私のお気に入りのデータベースはMongoDBです。パフォーマンスが重要な考慮事項である場合には、PostgreSQLを選ぶでしょう。</p>
                <p>データベースではありませんが、Redisの使用と構成の経験もあります。</p>

                <h2>オペレーティングシステム</h2>
                <p>私は主にWindowsユーザーですが、コンテナ化とホスティングにはUbuntuを好むため、コマンドラインに慣れています。他にもCentOS 7やManjaroなどのディストリビューションを少し使った経験があります。</p>
            </div>
        </>
    )
}