const mandiData = [

    {
        name:"Bhadohi",
        rate:2400,
        transport:2000
    },

    {
        name:"Varanasi",
        rate:2550,
        transport:4000
    },

    {
        name:"Prayagraj",
        rate:2600,
        transport:6000
    },

    {
        name:"Lucknow",
        rate:2750,
        transport:10000
    }

];

function money(value){

    return "₹" + Math.round(value)
        .toLocaleString("en-IN");

}

function calculateMandi(){

    const quantity =
        Number(
            document.getElementById("quantity").value
        );


    if(quantity <= 0){

        alert("Quantity 0 se greater honi chahiye.");

        return;
    }


    let results = [];


    mandiData.forEach(mandi => {

        const cropValue =
            mandi.rate * quantity;


        const net =
            cropValue - mandi.transport;


        results.push({

            name:mandi.name,

            rate:mandi.rate,

            transport:mandi.transport,

            cropValue:cropValue,

            net:net

        });

    });




    results.sort(
        (a,b) => b.net - a.net
    );


    const best =
        results[0];



    document.getElementById(
        "recommendedMandi"
    ).innerText =
        best.name + " Mandi";


    document.getElementById(
        "recommendedNet"
    ).innerText =
        money(best.net);


    document.getElementById(
        "recommendationText"
    ).innerText =
        quantity +
        " Quintal ke liye estimated " +
        money(best.net) +
        " net realization mil sakta hai.";


    const table =
        document.getElementById("mandiTable");


    table.innerHTML = "";


    results.forEach(
        (mandi,index) => {

            const row =
                document.createElement("tr");


            if(index === 0){

                row.classList.add("best");

            }


            row.innerHTML = `

                <td>

                    <span class="mandi-name">

                        ${mandi.name}

                    </span>

                </td>


                <td>

                    ${money(mandi.rate)}

                </td>


                <td>

                    ${money(mandi.cropValue)}

                </td>


                <td>

                    <span class="transport">

                        − ${money(mandi.transport)}

                    </span>

                </td>


                <td>

                    <span class="net">

                        ${money(mandi.net)}

                    </span>

                </td>


                <td>

                    ${
                        index === 0

                        ?

                        `
                        <span class="badge">
                            🏆 Recommended
                        </span>
                        `

                        :

                        `Compare`

                    }

                </td>

            `;


            table.appendChild(row);

        }
    );

}

document
    .getElementById("quantity")
    .addEventListener(
        "input",
        calculateMandi
    );


calculateMandi();


const translations = {
    en: {
        heroTitle: "Mitti2Market",
        tagline: "Mitti Se Seedha Market Tak",
        login: "Login",
        register: "Register",
        farmer: "Main Kisan Hoon →",
        buyer: "Main Buyer Hoon →",
        description: "Kisan ki mehnat, ab milegi behtar keemat.",
        subtitle: "Mitti Se Seedha Market Tak"
    },

    hi: {
        heroTitle: "मिट्टी2मार्केट",
        tagline: "मिट्टी से सीधा मार्केट तक",
        login: "लॉगिन",
        register: "रजिस्टर",
        farmer: "मैं किसान हूँ →",
        buyer: "मैं खरीदार हूँ →",
        description: "किसान की मेहनत, अब मिलेगी बेहतर कीमत।",
        subtitle: "मिट्टी से सीधा बाज़ार तक"
    },

    ta: {
        heroTitle: "மிட்டி2மார்க்கெட்",
        tagline: "மண்ணிலிருந்து நேரடியாக சந்தைக்கு",
        login: "உள்நுழைய",
        register: "பதிவு செய்க",
        farmer: "நான் விவசாயி →",
        buyer: "நான் வாங்குபவர் →",
        description: "விவசாயிகளின் உழைப்புக்கு இனி சிறந்த விலை.",
        subtitle: "மண்ணிலிருந்து நேரடியாக சந்தைக்கு"
    },

    mr: {
        heroTitle: "मिट्टी2मार्केट",
        tagline: "मातीतून थेट बाजारपेठेत",
        login: "लॉगिन",
        register: "नोंदणी",
        farmer: "मी शेतकरी आहे →",
        buyer: "मी खरेदीदार आहे →",
        description: "शेतकऱ्यांच्या मेहनतीला आता मिळेल योग्य भाव.",
        subtitle: "मातीतून थेट बाजारपेठेत"
    }
};

const languageSelect = document.querySelector("#languageSelect");

languageSelect.addEventListener("change", function () {
    const selectedLanguage = this.value;
    const languageData = translations[selectedLanguage];

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");

        if (languageData[key]) {
            element.textContent = languageData[key];
        }
    });

    document.documentElement.lang = selectedLanguage;
});