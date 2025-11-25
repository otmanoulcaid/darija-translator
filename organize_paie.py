# # import os
# # import glob
# # import openpyxl
# # import shutil

# # # Chemin du dossier de base où se trouvent les dossiers recup_dir.*
# # base_path = 'F:\\recup_dir\f13670992.xlsx' 
# # # Dossier de destination pour les bulletins de paie organisés
# # output_dir = 'paie'
# # # Crée le dossier de destination s'il n'existe pas
# # os.makedirs(output_dir, exist_ok=True)

# # # Parcourt tous les dossiers qui commencent par 'recup_dir.'
# # # for dir_path in glob.glob(os.path.join(base_path, 'recup_dir.*')):
# # if os.path.isdir('F:\\recup_dir.35'):
# #     # Parcourt tous les fichiers .xlsx dans chaque dossier
# #     for xlsx_file in glob.glob(os.path.join('F:\\recup_dir.35', '*.xlsx')):
# #         try:
# #             # Ouvre le classeur Excel
# #             workbook = openpyxl.load_workbook(xlsx_file, data_only=True)
# #             sheet = workbook.active
            
# #             print(workbook)
# #             # # Variable pour indiquer si le bulletin de paie est trouvé
# #             # is_bulletin_de_paie = False
# #             # # Parcourt toutes les cellules pour trouver "BULLETIN DE PAIE"
# #             # for row in sheet.iter_rows():
# #             #     for cell in row:
# #             #         if cell.value and "BULLETIN DE PAIE" in str(cell.value):
# #             #             is_bulletin_de_paie = True
# #             #             break
# #             #     if is_bulletin_de_paie:
# #             #         break
            
# #             # if is_bulletin_de_paie:
# #             #     # Récupère la valeur du CIN dans la cellule B7
# #             #     cin = sheet['B7'].value
                
# #             #     if cin:
# #             #         # Nettoie la valeur du CIN pour l'utiliser comme nom de dossier
# #             #         cin_folder_name = str(cin).strip()
# #             #         # Crée le dossier pour le CIN s'il n'existe pas
# #             #         cin_dir = os.path.join(output_dir, cin_folder_name)
# #             #         os.makedirs(cin_dir, exist_ok=True)
                    
# #             #         # Copie le fichier .xlsx dans le dossier du CIN
# #             #         shutil.copy(xlsx_file, cin_dir)
# #             #         print(f"Copié: {xlsx_file} -> {cin_dir}")

# #         except Exception as e:
# #             print(f"Erreur lors du traitement du fichier {xlsx_file}: {e}")

# import os
# import glob
# import openpyxl
# import shutil
# import re

# # Dossier contenant les fichiers récupérés
# base_path = r"F:\recup_dir.35"

# # Dossier racine pour stocker les bulletins
# output_root = 'paie'
# os.makedirs(output_root, exist_ok=True)

# # ---------------------------------------------------------
# # Fonction : récupérer valeur réelle (fusionnée ou non)
# # ---------------------------------------------------------
# def get_merged_value(sheet, cell):
#     for merged_range in sheet.merged_cells.ranges:
#         if cell.coordinate in merged_range:
#             top_left_cell = sheet[merged_range.start_cell.coordinate]
#             return top_left_cell.value
#     return cell.value

# # ---------------------------------------------------------
# # Fonction : nettoyer le CIN pour créer un dossier valide
# # ---------------------------------------------------------
# def clean_cin(value):
#     """
#     Nettoie le CIN pour enlever les caractères interdits 
#     et les mots inutiles.
#     Exemples :
#     'N° CIN : CD244435' → 'CD244435'
#     'CIN: AB1234 '     → 'AB1234'
#     """
#     if not value:
#         return None

#     value = str(value)

#     # Retirer les mots fixes
#     value = value.replace("N°", "").replace("CIN", "")
#     value = value.replace(":", "").replace("/", "")

#     # Nettoyer les espaces multiples
#     value = " ".join(value.split())

#     # Garder uniquement lettres + chiffres
#     value = re.sub(r"[^A-Za-z0-9]", "", value)

#     value = value.strip()
#     return value if value else None

# # ---------------------------------------------------------
# # Traitement des fichiers Excel
# # ---------------------------------------------------------
# for xlsx_file in glob.glob(os.path.join(base_path, "*.xlsx")):
#     try:
#         workbook = openpyxl.load_workbook(xlsx_file, data_only=True)
#         sheet = workbook.active

#         # Ignorer si plus de 60 lignes
#         if sheet.max_row > 60:
#             print(f"IGNORÉ (trop de lignes) : {xlsx_file} → {sheet.max_row} lignes")
#             continue

#         print(f"\nAnalyse : {xlsx_file}")

#         # -------------------------------
#         # 1) Vérifier BULLETIN DE PAIE
#         # -------------------------------
#         is_bulletin = False

#         for row in sheet.iter_rows():
#             row_values = [get_merged_value(sheet, cell) for cell in row]
#             text_row = " ".join([str(v) for v in row_values if v])

#             if "BULLETIN" in text_row.upper() and "PAIE" in text_row.upper():
#                 is_bulletin = True
#                 break

#         if not is_bulletin:
#             print("→ PAS un bulletin de paie. Ignoré.")
#             continue

#         print("→ BULLETIN DE PAIE détecté.")

#         # -----------------------------
#         # 2) Récupérer le CIN (B7-9)
#         # -----------------------------
#         cin_raw = None

#         for row_index in [7, 8, 9]:
#             try:
#                 cell_val = get_merged_value(sheet, sheet[f"B{row_index}"])
#                 if cell_val and str(cell_val).strip():
#                     cin_raw = str(cell_val).strip()
#                     break
#             except:
#                 pass

#         if not cin_raw:
#             print("❌ Aucun CIN trouvé dans B7/B8/B9 → fichier ignoré.")
#             continue

#         print(f"→ CIN brut : {cin_raw}")

#         # Nettoyage CIN
#         cin = clean_cin(cin_raw)

#         if not cin:
#             print("❌ CIN invalide après nettoyage → fichier ignoré.")
#             continue

#         print(f"→ CIN nettoyé : {cin}")

#         # -----------------------------
#         # 3) Copier dans dossier CIN
#         # -----------------------------
#         cin_folder = os.path.join(output_root, cin)
#         os.makedirs(cin_folder, exist_ok=True)

#         destination = os.path.join(cin_folder, os.path.basename(xlsx_file))
#         shutil.copy2(xlsx_file, destination)

#         print(f"✔ Fichier copié dans : {destination}")

#     except Exception as e:
#         print("Erreur :", e)
import os
import glob
import shutil

# -----------------------------
# Configuration
# -----------------------------
base_path = '.'             # dossier courant ou à changer
output_folder = 'pdf_all'   # dossier où tous les PDFs seront copiés
os.makedirs(output_folder, exist_ok=True)

# -----------------------------
# Parcours des dossiers recup_dir.*
# -----------------------------
for dir_path in glob.glob(os.path.join(base_path, "recup_dir.*")):
    if not os.path.isdir(dir_path):
        continue

    # Parcours tous les fichiers PDF dans le dossier
    for pdf_file in glob.glob(os.path.join(dir_path, "*.pdf")):
        try:
            destination = os.path.join(output_folder, os.path.basename(pdf_file))
            shutil.copy2(pdf_file, destination)  # <-- ici on copie au lieu de déplacer
            print(f"✔ Copié : {pdf_file} → {destination}")
        except Exception as e:
            print(f"Erreur avec {pdf_file} :", e)
