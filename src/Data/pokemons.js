import charmanderImagem from "../assets/charmander.png";
import charmeleonImagem from "../assets/charmeleon.png";
import charizardImagem from "../assets/charizard.png";

import squirtleImagem from "../assets/squirtle.png";
import wartortleImagem from "../assets/wartortle.png";
import blastoiseImagem from "../assets/blastoise.png";

import bulbasauroImagem from "../assets/bulbasauro.png";
import ivysaurImagem from "../assets/ivysaur.png";
import venosaurImagem from "../assets/venosaur.png";

import totodileImagem from "../assets/Totodile.png";
import croconawImagem from "../assets/Croconaw.png";
import feraligatrImagem from "../assets/Feraligatr.png";

import cyndaquilImagem from "../assets/Cyndaquil.png";
import quilavaImagem from "../assets/Quilava.png";
import typhlosionImagem from "../assets/Typhlosion.png";

import vulpixImagem from "../assets/Vulpix.png";
import ninetalesImagem from "../assets/Ninetales.png";



const pokemons = {

  Cyndaquil: {
    evolucao: "Quilava",
    imagem: cyndaquilImagem,
    tipo: "fogo",
  },

  Quilava: {
    evolucao: "Typhlosion",
    imagem: quilavaImagem,
    tipo: "fogo",
  },

  Typhlosion: {
    evolucao: null,
    imagem: typhlosionImagem,
    tipo: "fogo",
  },
  Charmander: {
    evolucao: "Charmeleon",
    imagem: charmanderImagem,
    tipo: "fogo",
  },
  Charmeleon: {
    evolucao: "Charizard",
    imagem: charmeleonImagem,
    tipo: "fogo",
  },
  Charizard: {
    evolucao: null,
    imagem: charizardImagem,
    tipo: "fogo",
  },

  Squirtle: {
    evolucao: "Wartortle",
    imagem: squirtleImagem,
    tipo: "agua",
  },
  Wartortle: {
    evolucao: "Blastoise",
    imagem: wartortleImagem,
    tipo: "agua",
  },
  Blastoise: {
    evolucao: null,
    imagem: blastoiseImagem,
    tipo: "agua",
  },

  Bulbasauro: {
    evolucao: "Ivysaur",
    imagem: bulbasauroImagem,
    tipo: "planta",
  },
  Ivysaur: {
    evolucao: "Venosaur",
    imagem: ivysaurImagem,
    tipo: "planta",
  },
  Venosaur: {
    evolucao: null,
    imagem: venosaurImagem,
    tipo: "planta",
  },

  Totodile: {
    evolucao: "Croconaw",
    imagem: totodileImagem,
    tipo: "agua"
  },

  Croconaw: {
    evolucao: "Feraligatr",
    imagem: croconawImagem,
    tipo: "agua",
  },

  Feraligatr: {
    evolucao: null,
    imagem: feraligatrImagem,
    tipo: "agua",
  },

  Vulpix: { 
    evolucao: "Ninetales",
    imagem: vulpixImagem,
    tipo: "fogo"
  },

  Ninetales: {
    evolucao: null,
    imagem: ninetalesImagem,
    tipo: "fogo",
  },
};

export default pokemons;
