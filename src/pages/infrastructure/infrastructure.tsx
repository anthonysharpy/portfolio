export function InfrastructurePage() {
    return (
        <>
            <h2>Hosting and Deployment</h2>
            <p>At my second company I set up the Docker stack used to host our websites (utilising Nginx), as well as our internal API (in Go).</p>
            <p>At my current company I have contributed heavily to the local Docker development stack, adding the ability for the tests to run out-of-the-box without any configuration. I created multiple Docker stacks across different repositories that run our unit tests via GitHub Actions, in addition to new container definitions for AWS (again, using Nginx) on which to host our lending sites and internal dashboards.</p>
            <p>I also have personal experience creating Docker stacks for Capacitor app sites (Vue.js) with a Go backend, hosted on DigitalOcean.</p>
            <p>All the above has also made me confident with tasks such as setting up SLS certificates (Certbot etc), writing Nginx site configurations, configuring firewalls, connecting via SSH and SFTP, creating DNS records and more.</p>
            <p>In terms of hosting providers, I have exposure to Azure, AWS and DigitalOcean. I would be comfortable creating and deploying a website or API in a scalable, secure and economically sensible fashion on any of these, as well as utilising many of the extra features they offer such as bucket storage, database hosting or health checks.</p>
            <p>I have commercial experience utilising deployment tools such as GitHub Actions, TeamCity and Jenkins.</p>
            <h2>Databases</h2>
            <p>I have used PostgreSQL, Microsft SQL Server, MongoDB and MySQL in a commercial setting.</p>
            <p>I am a fan of an everything-in-a-transaction approach, but have also worked on lots of APIs in stacks where transactions aren't strongly encouraged (e.g. MongoDB). Interstingly most of the companies I have worked at have either not used transactions or have done so sparingly.</p>
            <p>When it comes to simplicity, my favourite database is MongoDB. If I had to pick something where performance was an important consideration, I'd probably opt for PostgreSQL.</p>
            <p>While not a database, I have experience using and configuring Redis.</p>
            <h2>Operating Systems</h2>
            <p>I am primarily a Windows user but I prefer Ubuntu for containerisation and hosting, so am comfortable on the command line. I also have some experience with other flavours like CentOS 7 and Manjaro.</p>
        </>
    )
}