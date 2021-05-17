import codecs
import difflib
import glob
import logging
import os.path
import shutil
from pprint import pprint

import aksharamukha.transliterate
import sys
from aksharamukha import GeneralMap


logging.basicConfig(
    level=logging.DEBUG,
    format="%(levelname)s: %(asctime)s %(message)s"
)

REPO_BASE = os.path.dirname(os.path.dirname(__file__))
differ = difflib.Differ()


def update_maps():
    files = glob.glob(os.path.join(REPO_BASE, "src/schemes/brahmic/*.json"))
    devanagari_json_path = os.path.join(REPO_BASE, "src/schemes/brahmic/devanagari.json")
    with codecs.open(devanagari_json_path, "r", "utf-8") as f:
        devanagari_json = f.read()
    for file in files:
        if "devanagari" in file or "_" in file:
            continue
        with codecs.open(file, "r", "utf-8") as f:
            prior_json = f.read()
        dest_script = os.path.basename(file).capitalize().replace(".json", "")
        posterior_json = aksharamukha.transliterate.process(src=GeneralMap.DEVANAGARI, tgt=dest_script, txt=devanagari_json)

        if posterior_json != prior_json:
            logging.info("Difference in %s:", file)
            diff = differ.compare(prior_json, posterior_json)
            for x in diff:
                pprint(x)
            with codecs.open(file, "w", "utf-8") as f:
                f.write(posterior_json)


if __name__ == '__main__':
    update_maps()
