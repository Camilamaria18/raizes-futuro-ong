function aplicarMascaraCPF(v){
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v;
}

function aplicarMascaraTelefone(v){
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
  return v;
}

function aplicarMascaraCEP(v){
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  return v;
}

document.addEventListener("DOMContentLoaded", function(){

  const cpf = document.getElementById("cpf");
  const tel = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  const form = document.getElementById("cadastro-form");
  const toast = document.getElementById("toast");

  if(cpf){
    cpf.addEventListener("input", function(){ this.value = aplicarMascaraCPF(this.value); });
  }
  if(tel){
    tel.addEventListener("input", function(){ this.value = aplicarMascaraTelefone(this.value); });
  }
  if(cep){
    cep.addEventListener("input", function(){ this.value = aplicarMascaraCEP(this.value); });
  }

  if(form && localStorage.getItem("cadastroData")){
    const savedData = JSON.parse(localStorage.getItem("cadastroData"));
    for(const key in savedData){
      if(form.elements[key]){
        form.elements[key].value = savedData[key];
      }
    }
  }

  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();

      if(!form.checkValidity()){
        showToast("Preencha corretamente todos os campos.");
        return;
      }

      const data = new FormData(form);
      const payload = {};
      for(const [k,v] of data.entries()) payload[k] = v;

      localStorage.setItem("cadastroData", JSON.stringify(payload));

      showToast("Cadastro enviado com sucesso!");

      form.reset();
    });
  }

  function showToast(text, time = 3000){
    if(!toast) return alert(text);
    toast.textContent = text;
    toast.style.display = "block";
    toast.style.opacity = "1";
    setTimeout(()=> {
      toast.style.opacity = "0";
      setTimeout(()=> toast.style.display = "none", 300);
    }, time);
  }

  const btnAcess = document.getElementById("btnAcessibilidade");
  const menuAcess = document.getElementById("menuAcessibilidade");

  if(btnAcess){
    btnAcess.addEventListener("click", () => {
      const opened = menuAcess.style.display === "flex";
      menuAcess.style.display = opened ? "none" : "flex";
      menuAcess.setAttribute("aria-hidden", opened);
    });
  }

  document.getElementById("toggleDark")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  document.getElementById("toggleContraste")?.addEventListener("click", () => {
    document.body.classList.toggle("contraste");
  });

  document.getElementById("fontAumentar")?.addEventListener("click", () => {
    document.documentElement.classList.add("aumentar-fonte");
    document.documentElement.classList.remove("diminuir-fonte");
  });

  document.getElementById("fontDiminuir")?.addEventListener("click", () => {
    document.documentElement.classList.add("diminuir-fonte");
    document.documentElement.classList.remove("aumentar-fonte");
  });

  document.getElementById("resetAcess")?.addEventListener("click", () => {
    document.body.classList.remove("dark-mode");
    document.body.classList.remove("contraste");
    document.documentElement.classList.remove("aumentar-fonte");
    document.documentElement.classList.remove("diminuir-fonte");
  });

});
