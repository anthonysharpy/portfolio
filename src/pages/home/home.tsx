import { useContext } from "react";
import { SiteContext } from "../globalcontext";

export function HomePage() {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div className="centered-justified" style={{ display: siteContext?.currentLanguage === "EN" ? 'block' : 'none' }}>
                <h2>A bit about me</h2>
                <p>My name is Anthony and I am a 26 year-old software developer currently based in the United Kingdom.</p>
                <p>I have over three and a half years of commercial experience. I seem to have created a niche for myself in the financial services sector, but am happy working in any industry.</p>
                <p>My dad was a programmer/electronics engineer in the 80s/90s and got me into programming at a young age. I started with Python at age 10 writing some really basic scripts. At age 12 I made my first tacky HTML-only website for a school project about India. From the age of about 13 I started getting into C++. At age 14 I started making things in Unity with C#. At age 17/18 I started getting more into web development, making websites, creating APIs in PHP and Go, and creating a law app for Android in Java. I guess you could say I really was a <em>junior</em> developer!</p>
            </div>

            <div className="centered-justified" style={{ display: siteContext?.currentLanguage === "JP" ? 'block' : 'none' }}>
                <h2>私について</h2>
                <p>私の名前はアンソニーで、現在イギリスに拠点を置く26歳のソフトウェア開発者です。</p>
                <p>3年半以上の商業経験があります。金融サービス分野に自分のニッチを作り上げたようですが、どの業界でも働くことができます。</p>
                <p>私の父は80年代/90年代のプログラマー/エレクトロニクスエンジニアで、若い頃からプログラミングに興味を持つようになりました。10歳の時にPythonで非常に基本的なスクリプトを書き始めました。12歳の時、学校のインドについてのプロジェクトのために最初の下手なHTMLオンリーのウェブサイトを作りました。13歳頃からC++に興味を持ち始めました。14歳の時にUnityでC#を使って物を作り始めました。17歳/18歳の時にウェブ開発にさらに興味を持ち、ウェブサイトを作成したり、PHPやGoでAPIを作成したり、JavaでAndroid向けの法律アプリを作成したりしました。私は本当に<em>ジュニア</em>開発者だったと言えるでしょう！</p>
            </div>
        </>
    )
}