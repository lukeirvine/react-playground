try:
    with open("words.txt", "r") as f:
        words = f.readlines()
except(FileNotFoundError):
    print("Error: There is no file to load")

with open("words.js", "w") as out:
    out.write("export const words = [\n")
    for word in words:
        str = word.removesuffix('\n')
        out.write("\t\"" + str + "\",\n")
    out.write("];")
