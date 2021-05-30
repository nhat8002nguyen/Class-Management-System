// Generated code from Butter Knife. Do not modify!
package com.haerul.foodsapp.view.detail;

import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.Toolbar;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.appbar.CollapsingToolbarLayout;
import com.haerul.foodsapp.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class DetailActivity_ViewBinding implements Unbinder {
  private DetailActivity target;

  @UiThread
  public DetailActivity_ViewBinding(DetailActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public DetailActivity_ViewBinding(DetailActivity target, View source) {
    this.target = target;

    target.toolbar = Utils.findRequiredViewAsType(source, R.id.toolbar, "field 'toolbar'", Toolbar.class);
    target.appBarLayout = Utils.findRequiredViewAsType(source, R.id.appbar, "field 'appBarLayout'", AppBarLayout.class);
    target.collapsingToolbarLayout = Utils.findRequiredViewAsType(source, R.id.collapsing_toolbar, "field 'collapsingToolbarLayout'", CollapsingToolbarLayout.class);
    target.mealThumb = Utils.findRequiredViewAsType(source, R.id.mealThumb, "field 'mealThumb'", ImageView.class);
    target.category = Utils.findRequiredViewAsType(source, R.id.category, "field 'category'", TextView.class);
    target.country = Utils.findRequiredViewAsType(source, R.id.country, "field 'country'", TextView.class);
    target.instructions = Utils.findRequiredViewAsType(source, R.id.instructions, "field 'instructions'", TextView.class);
    target.ingredients = Utils.findRequiredViewAsType(source, R.id.ingredient, "field 'ingredients'", TextView.class);
    target.measures = Utils.findRequiredViewAsType(source, R.id.measure, "field 'measures'", TextView.class);
    target.progressBar = Utils.findRequiredViewAsType(source, R.id.progressBar, "field 'progressBar'", ProgressBar.class);
    target.youtube = Utils.findRequiredViewAsType(source, R.id.youtube, "field 'youtube'", TextView.class);
    target.source = Utils.findRequiredViewAsType(source, R.id.source, "field 'source'", TextView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    DetailActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.toolbar = null;
    target.appBarLayout = null;
    target.collapsingToolbarLayout = null;
    target.mealThumb = null;
    target.category = null;
    target.country = null;
    target.instructions = null;
    target.ingredients = null;
    target.measures = null;
    target.progressBar = null;
    target.youtube = null;
    target.source = null;
  }
}
