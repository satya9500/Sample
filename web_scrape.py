def scarp(item):
    from selenium import webdriver
    from bs4 import BeautifulSoup
    import time
    from selenium.common.exceptions import NoSuchElementException

    path = '/home/warrior/chromedriver'
    driver = webdriver.Chrome(executable_path=path)
    item = str(item)
    driver.get("https://www.google.com/search?q=how+to+preserve+fresh+"+item+"+without+freezing&oq=how+to+preserve+fresh+tomatoes+without+freezing&aqs=chrome..69i57.525j0j7&sourceid=chrome&ie=UTF-8")
    content = driver.page_source
    soup = BeautifulSoup(content, features="html.parser")
    try:
        div = driver.find_element_by_css_selector('#rso > div:nth-child(1) > div > div.kp-blk.c2xzTb.Wnoohf.OJXvsb > div > div.ifM9O ').text
        print(div)
    except NoSuchElementException as exception:
        print("No such element")
    driver.close()

scarp("bread")