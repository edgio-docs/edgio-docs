---
title: Country and Country Subdivision Codes
---

{{ PRODUCT }} identifies countries and country subdivisions (e.g., states or provinces) through [country codes](#country-codes) and [country subdivision codes](#country-subdivision-codes), respectively.

## Country Codes {/*country-codes*/}

ISO-3166 country codes are supported by:

-   **Rules:** [Country match condition](/applications/performance/rules/conditions#country)
-   **CDN-as-code:** [location.country condition](/docs/v7.x/api/core/interfaces/types.RulesVariables.html#location)
-   **Web Application Firewall:** [Access Rules](/applications/security/access_rules), [Rate Rules](/applications/security/rate_rules), [Bot Manager](/applications/security/bot_rules), [Custom Rules](/applications/security/custom_rules), and [Dashboard](/applications/security/dashboard)

<Callout type="info">

  Country codes are case-insensitive.

</Callout>

| Code | Country                      |
| ---- | ---------------------------- |
| AF   | Afghanistan                  |
| AL   | Albania                      |
| DZ   | Algeria                      |
| AS   | American Samoa               |
| AD   | Andorra                      |
| AO   | Angola                       |
| AI   | Anguilla                     |
| <a id="anonymous-proxy" />A1   | Anonymous Proxy <br /><br /><Callout type="info">This country code identifies a set of IP addresses used by specific anonymizers or VPN services. These types of services may be used to circumvent IP geolocation restrictions. This country code does not provide complete coverage of all proxied traffic. Rather, it identifies traffic for specific legal anonymous proxies.</Callout> |
|  <a id="satellite-provider" />A2   | Satellite Provider <br /><br /><Callout type="info">This country code identifies a set of IP addresses used by Satellite ISPs to provide Internet service to multiple countries (e.g., Nigeria and Ghana).</Callout> |
| AQ   | Antarctica                   |
| AG   | Antigua and Barbuda          |
| AR   | Argentina                    |
| AM   | Armenia                      |
| AW   | Aruba                        |
|  <a id="asia-pacific-region" />AP   | Asia/Pacific Region <br /><br /><Callout type="info">This country code identifies a small subset of IP addresses for the Asia/Pacific region. <br />[Learn more.](#regions) </Callout>  |
| AU   | Australia                    |
| AT   | Austria                      |
| AZ   | Azerbaijan                   |
| BS   | Bahamas                      |
| BH   | Bahrain                      |
| BD   | Bangladesh                   |
| BB   | Barbados                     |
| BY   | Belarus                      |
| BE   | Belgium                      |
| BZ   | Belize                       |
| BJ   | Benin                        |
| BM   | Bermuda                      |
| BT   | Bhutan                       |
| BO   | Bolivia                      |
| BA   | Bosnia and Herzegovina       |
| BW   | Botswana                     |
| BV   | Bouvet Island                |
| BR   | Brazil                       |
| IO   | British Indian Ocean Territory |
| BN   | Brunei Darussalam            |
| BG   | Bulgaria                     |
| BF   | Burkina Faso                 |
| BI   | Burundi                      |
| KH   | Cambodia                     |
| CM   | Cameroon                     |
| CA   | Canada                       |
| CV   | Cape Verde                   |
| KY   | Cayman Islands               |
| CF   | Central African Republic     |
| TD   | Chad                         |
| CL   | Chile                        |
| CN   | China                        |
| CX   | Christmas Island             |
| CC   | Cocos (Keeling) Islands      |
| CO   | Colombia                     |
| KM   | Comoros                      |
| CG   | Congo                        |
| CD   | Congo, The Democratic Republic of the |
| CK   | Cook Islands                 |
| CR   | Costa Rica                   |
| CI   | Cote d'Ivoire                |
| HR   | Croatia                      |
| CU   | Cuba                         |
| CY   | Cyprus                       |
| CZ   | Czech Republic               |
| DK   | Denmark                      |
| DJ   | Djibouti                     |
| DM   | Dominica                     |
| DO   | Dominican Republic           |
| EC   | Ecuador                      |
| EG   | Egypt                        |
| SV   | El Salvador                  |
| GQ   | Equatorial Guinea            |
| ER   | Eritrea                      |
| EE   | Estonia                      |
| ET   | Ethiopia                     |
| <a id="europe" />EU   | Europe  <br /><br /><Callout type="info">This country code identifies a small subset of European IP addresses. <br />[Learn more.](#regions) </Callout>|
| FK   | Falkland Islands (Malvinas)  |
| FO   | Faroe Islands                |
| FJ   | Fiji                         |
| FI   | Finland                      |
| FR   | France                       |
| GF   | French Guiana                |
| PF   | French Polynesia             |
| TF   | French Southern Territories  |
| GA   | Gabon                        |
| GM   | Gambia                       |
| GE   | Georgia                      |
| DE   | Germany                      |
| GH   | Ghana                        |
| GI   | Gibraltar                    |
| GR   | Greece                       |
| GL   | Greenland                    |
| GD   | Grenada                      |
| GP   | Guadeloupe                   |
| GU   | Guam                         |
| GT   | Guatemala                    |
| GG   | Guernsey                     |
| GN   | Guinea                       |
| GW   | Guinea-Bissau                |
| GY   | Guyana                       |
| HT   | Haiti                        |
| HM   | Heard Island and McDonald Islands |
| VA   | Holy See (Vatican City State) |
| HN   | Honduras                     |
| HK   | Hong Kong                    |
| HU   | Hungary                      |
| IS   | Iceland                      |
| IN   | India                        |
| ID   | Indonesia                    |
| IR   | Iran, Islamic Republic of    |
| IQ   | Iraq                         |
| IE   | Ireland                      |
| IM   | Isle of Man                  |
| IL   | Israel                       |
| IT   | Italy                        |
| JM   | Jamaica                      |
| JP   | Japan                        |
| JE   | Jersey                       |
| JO   | Jordan                       |
| KZ   | Kazakhstan                   |
| KE   | Kenya                        |
| KI   | Kiribati                     |
| KP   | Korea, Democratic People's Republic of |
| KR   | Korea, Republic of           |
| KW   | Kuwait                       |
| KG   | Kyrgyzstan                   |
| LA   | Lao People's Democratic Republic |
| LV   | Latvia                       |
| LB   | Lebanon                      |
| LS   | Lesotho                      |
| LR   | Liberia                      |
| LY   | Libyan Arab Jamahiriya       |
| LI   | Liechtenstein                |
| LT   | Lithuania                    |
| LU   | Luxembourg                   |
| MO   | Macao                        |
| MK   | Macedonia                    |
| MG   | Madagascar                   |
| MW   | Malawi                       |
| MY   | Malaysia                     |
| MV   | Maldives                     |
| ML   | Mali                         |
| MT   | Malta                        |
| MH   | Marshall Islands             |
| MQ   | Martinique                   |
| MR   | Mauritania                   |
| MU   | Mauritius                    |
| YT   | Mayotte                      |
| MX   | Mexico                       |
| FM   | Micronesia, Federated States of |
| MD   | Moldova, Republic of         |
| MC   | Monaco                       |
| MN   | Mongolia                     |
| ME   | Montenegro                   |
| MS   | Montserrat                   |
| MA   | Morocco                      |
| MZ   | Mozambique                   |
| MM   | Myanmar                      |
| NA   | Namibia                      |
| NR   | Nauru                        |
| NP   | Nepal                        |
| NL   | Netherlands                  |
| AN   | Netherlands Antilles         |
| NC   | New Caledonia                |
| NZ   | New Zealand                  |
| NI   | Nicaragua                    |
| NE   | Niger                        |
| NG   | Nigeria                      |
| NU   | Niue                         |
| NF   | Norfolk Island               |
| MP   | Northern Mariana Islands     |
| NO   | Norway                       |
| OM   | Oman                         |
| PK   | Pakistan                     |
| PW   | Palau                        |
| PS   | Palestinian Territory        |
| PA   | Panama                       |
| PG   | Papua New Guinea             |
| PY   | Paraguay                     |
| PE   | Peru                         |
| PH   | Philippines                  |
| PL   | Poland                       |
| PT   | Portugal                     |
| PR   | Puerto Rico                  |
| QA   | Qatar                        |
| RE   | Reunion                      |
| RO   | Romania                      |
| RU   | Russian Federation           |
| RW   | Rwanda                       |
| SH   | Saint Helena                 |
| KN   | Saint Kitts and Nevis        |
| LC   | Saint Lucia                  |
| PM   | Saint Pierre and Miquelon    |
| VC   | Saint Vincent and the Grenadines |
| WS   | Samoa                        |
| SM   | San Marino                   |
| ST   | Sao Tome and Principe        |
| SA   | Saudi Arabia                 |
| SN   | Senegal                      |
| RS   | Serbia                       |
| SC   | Seychelles                   |
| SL   | Sierra Leone                 |
| SG   | Singapore                    |
| SK   | Slovakia                     |
| SI   | Slovenia                     |
| SB   | Solomon Islands              |
| SO   | Somalia                      |
| ZA   | South Africa                 |
| GS   | South Georgia and the South Sandwich Islands |
| ES   | Spain                        |
| LK   | Sri Lanka                    |
| SD   | Sudan                        |
| SR   | Suriname                     |
| SJ   | Svalbard and Jan Mayen       |
| SZ   | Swaziland                    |
| SE   | Sweden                       |
| CH   | Switzerland                  |
| SY   | Syrian Arab Republic         |
| TW   | Taiwan                       |
| TJ   | Tajikistan                   |
| TZ   | Tanzania, United Republic of |
| TH   | Thailand                     |
| TG   | Togo                         |
| TK   | Tokelau                      |
| TO   | Tonga                        |
| TT   | Trinidad and Tobago          |
| TN   | Tunisia                      |
| TR   | Turkey                       |
| TM   | Turkmenistan                 |
| TC   | Turks and Caicos Islands     |
| TV   | Tuvalu                       |
| UG   | Uganda                       |
| UA   | Ukraine                      |
| AE   | United Arab Emirates         |
| GB   | United Kingdom               |
| US   | United States                |
| UM   | United States Minor Outlying Islands |
| UY   | Uruguay                      |
| UZ   | Uzbekistan                   |
| VU   | Vanuatu                      |
| VE   | Venezuela                    |
| VN   | Vietnam                      |
| VG   | Virgin Islands, British      |
| VI   | Virgin Islands, U.S.         |
| WF   | Wallis and Futuna            |
| EH   | Western Sahara               |
| YE   | Yemen                        |
| ZM   | Zambia                       |
| ZW   | Zimbabwe                     |

### Region-Specific Country Codes {/*regions*/}

{{ PRODUCT }} identifies the location from which a client requests your content through the client's IP address. However, certain IP addresses are not specific to a particular country, rather they are spread out over an entire region (i.e., Europe or Asia/Pacific). Requests that originate from these types of IP addresses are identified by a region-specific code instead of a country code. Region-specific codes identify requests for which a country of origin is unknown. Additionally, these codes represent a small subset of IP addresses in that region.

Country codes that identify a region are listed below.

-   **A1:** [Anonymous Proxy](#anonymous-proxy)
-   **A2:** [Satellite Provider](#satellite-provider)
-   **AP:** [Asia/Pacific Region](#asia-pacific-region)
-   **EU:** [Europe](#europe)

## Country Subdivision Codes {/*country-subdivision-codes*/}

Country subdivision codes identify a country's subdivision (e.g., state or province). These codes are compatible with:

-   **Rules:** [Region Code match condition](/applications/performance/rules/conditions#region-code)

    **Syntax:** Specify a region using the subdivision code from an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).

    `<Country Code>`-`<Subdivision Code>`
    
    **Example:**

    The ISO-3166-2 code for California is `US-CA`. Therefore, the subdivision code for California is `CA`.

-   **Web Application Firewall:** [Access Rules](/applications/security/access_rules#country-subdivision--iso3166-2-) and [Custom Rules](/applications/security/custom_rules#country-subdivision--iso3166-2-)

    **Syntax:** Specify each desired subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).

    `<Country Code>`-`<Subdivision Code>`

    **Example:**

    Identify requests from California through the `US-CA` code.