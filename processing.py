import json

with open('./src/data/weapon-data.json', 'r', errors="ignore") as file:
    data = json.load(file)
    new_game = []
    number = 0
    print(data[0])  # swordAndShield
    # data['item'] is the array of games, go over the array and for each game, return a dict
    for weapon in data:
        # print(number, weapon)

        number += 1

    # newData = json.dumps(data, indent=2)

# with open('new-game-seeds.json', 'w') as file:
    # file.write(newData)
