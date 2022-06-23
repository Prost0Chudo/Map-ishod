<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Contacts");?>
<style>
        .map {
            width: 60%;
            height: 750px;
            margin-left: 20%;
            margin-right: 30%;
            padding: 0;
        }
</style>
    <!--
        Укажите свой API-ключ. Тестовый ключ НЕ БУДЕТ работать на других сайтах.
        Получить ключ можно в Кабинете разработчика: https://developer.tech.yandex.ru/keys/
    -->
    <div id="map" class="map"></div>
    <script src="https://api-maps.yandex.ru/2.1/?lang=en_RU&amp;apikey=8cbbd30d-041b-4d62-979b-9bc4821f4d2f"></script>
    <script src="custom_map.js"></script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>