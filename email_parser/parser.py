import json
import re
from datetime import datetime


def get_element(text, regex, group_n):
    element = re.search(regex, text, re.M)

    if element is not None and len(element.groups()) >= group_n:
        return element.group(group_n)


def get_subject(header):
    """
    Function for parsing **subject** of the email

    :param header: header from email
    :return: subject if exists, otherwise None
    """
    subject_en = get_element(header, r"^Subject:\s(.*)$", 1)
    subject_cz = get_element(header, r"^Předmět:\s(.*)$", 1)

    if subject_en is None and subject_cz is None:
        return

    return subject_cz if subject_en is None else subject_en


def get_sender(header):
    """
    Function for parsing **sender** of the email

    :param header: header from email
    :return: sender if exists, otherwise None
    """
    sender_en = get_element(header, r"^From:\s(.*)$", 1)
    sender_cz = get_element(header, r"^Od:\s(.*)$", 1)

    if sender_en is None and sender_cz is None:
        return

    return sender_cz if sender_en is None else sender_en


def get_recipient(header):
    """
    Function for parsing **recipient** of the email

    :param header: header from email
    :return: recipient if exists, otherwise None
    """
    recipient_en = get_element(header, r"^To:\s(.*)$", 1)
    recipient_cz = get_element(header, r"^Komu:\s(.*)$", 1)

    if recipient_en is None and recipient_cz is None:
        return

    return recipient_cz if recipient_en is None else recipient_en


def get_date(header):
    """
    Function for parsing **date** of the email

    :param header: header from email
    :return: date if exists, otherwise None
    """
    date_en = get_element(header, r"^Date:\s(.*)$", 1)
    date_cz = get_element(header, r"^Datum:\s(.*)$", 1)

    if date_en is None and date_cz is None:
        return

    return date_cz if date_en is None else date_en


def get_reply_to(header):
    """
    Function for parsing **reply-to** of the email

    :param header: header from email
    :return: reply-to if exists, otherwise None
    """
    reply_to = get_element(header, r"^Reply-To:\s(.*)$", 1)

    return reply_to


def get_cc(header):
    """
    Function for parsing **carbon copy** of the email

    :param header: header from email
    :return: cc if exists, otherwise None
    """
    cc = get_element(header, r"^Cc:\s(.*)$", 1)

    return cc


def parse_body(body):
    """
    Function for parsing **body** of the email. If body is in HTML format
    function parses only body of html code.

    :param body: body from email
    :return: body if exists, otherwise None
    """
    pattern = re.compile(r"<body\s*.*?>(.*)</body>", re.M | re.DOTALL | re.I)
    result = pattern.search(body)

    if result is None:
        return body

    html_body = result.group(1)

    return html_body


def disable_links(body):
    """
    Function disables all phishing link, they could be phishing and still active. Disable is done
    by adding char **x** at the beginning of links other than http or https protocol. For these two 
    char **t** is added in the middle of protocol to disable it in more sneaky way.

    :param body: body from email
    :return: body with disabled links
    """
    body = re.sub(r'(href=")', r'\1x', body)
    body = re.sub(r'xhttp', r'htttp', body)
    return body


def parser(text):
    """
    Function takes text from file and parses it to email parts.
    These parts are parsed:

    * Subject
    * Sender
    * Recipient
    * Date
    * Reply-to
    * Cc
    * Body

    :param text: text containing email with headers
    :returns: Python object with all parts of email
    """

    # parse email into two parts -- header and body. Content-Length is at the end of header
    pattern = re.compile(
        r'(.*)^Content-Length:\s\d+(\r?\n){2}(.*)', re.M | re.DOTALL)

    if pattern.match(text) is None:
        return

    header = pattern.search(text).group(1)
    body = pattern.search(text).group(3)

    date = None

    # try to parse email into two formats
    for fmt in ('%d %b %Y %X %z', '%a, %d %b %Y %X %z'):
        try:
            date = datetime.strptime(get_date(header).lstrip().rstrip(), fmt)
            break
        except ValueError:
            continue

    # if date couldn't be parsed
    if date is None:
        return

    body = disable_links(body)

    data_set = {"subject": get_subject(header),
                "sender": get_sender(header),
                "recipient": get_recipient(header),
                "reply_to": get_reply_to(header),
                "date": date.__str__(),
                "cc": get_cc(header),
                "body": parse_body(body)}

    # object to JSON format
    json_dump = json.dumps(data_set)

    # JSON to Python object
    json_object = json.loads(json_dump)

    return json_object
